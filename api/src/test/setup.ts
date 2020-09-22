import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import { BadRequestError } from '../errors/bad-request-error';
import { UserAttrs } from '../models/user';
import { Country } from '../models/country';
import { CountryDoc } from '../models/country';
let countries: CountryDoc[] = [], testUserResponse: any;
declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}


/**
 * Builds a test user object
 * @function
 * @returns user User object
 */
export const buildUserObject = async (email: string = 'jonh.doe@test.com') => {
  if (!Array.isArray(countries) || countries.length === 0) {
    const response = await request(app)
      .get('/api/countries')
      .send();
    countries = response.body;
  }

  return {
    name: 'Jonh',
    lastname: 'Doe',
    email,
    password: 'jonhdoespas$',
    country: countries[0].id,
    telephone: '+34687014958',
    postcode: '46019',
  };
}

export const COUNTRIES = [
  'Afganistán',
  'Albania',
  'Alemania',
  'Andorra',
  'Angola',
  'Antigua y Barbuda',
  'Arabia Saudita',
  'Argelia',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaiyán',
  'Bahamas',
  'Bangladés',
  'Barbados',
  'Baréin',
  'Bélgica',
  'Belice',
  'Benín',
  'Bielorrusia',
  'Birmania',
  'Bolivia',
  'Bosnia y Herzegovina',
  'Botsuana',
  'Brasil',
  'Brunéi',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Bután',
  'Cabo Verde',
  'Camboya',
  'Camerún',
  'Canadá',
  'Catar',
  'Chad',
  'Chile',
  'China',
  'Chipre',
  'Ciudad del Vaticano',
  'Colombia',
  'Comoras',
  'Corea del Norte',
  'Corea del Sur',
  'Costa de Marfil',
  'Costa Rica',
  'Croacia',
  'Cuba',
  'Dinamarca',
  'Dominica',
  'Ecuador',
  'Egipto',
  'El Salvador',
  'Emiratos Árabes Unidos',
  'Eritrea',
  'Eslovaquia',
  'Eslovenia',
  'España',
  'Estados Unidos',
  'Estonia',
  'Etiopía',
  'Filipinas',
  'Finlandia',
  'Fiyi',
  'Francia',
  'Gabón',
  'Gambia',
  'Georgia',
  'Ghana',
  'Granada',
  'Grecia',
  'Guatemala',
  'Guyana',
  'Guinea',
  'Guinea ecuatorial',
  'Guinea-Bisáu',
  'Haití',
  'Honduras',
  'Hungría',
  'India',
  'Indonesia',
  'Irak',
  'Irán',
  'Irlanda',
  'Islandia',
  'Islas Marshall',
  'Islas Salomón',
  'Israel',
  'Italia',
  'Jamaica',
  'Japón',
  'Jordania',
  'Kazajistán',
  'Kenia',
  'Kirguistán',
  'Kiribati',
  'Kuwait',
  'Laos',
  'Lesoto',
  'Letonia',
  'Líbano',
  'Liberia',
  'Libia',
  'Liechtenstein',
  'Lituania',
  'Luxemburgo',
  'Macedonia del Norte',
  'Madagascar',
  'Malasia',
  'Malaui',
  'Maldivas',
  'Malí',
  'Malta',
  'Marruecos',
  'Mauricio',
  'Mauritania',
  'México',
  'Micronesia',
  'Moldavia',
  'Mónaco',
  'Mongolia',
  'Montenegro',
  'Mozambique',
  'Namibia',
  'Nauru',
  'Nepal',
  'Nicaragua',
  'Níger',
  'Nigeria',
  'Noruega',
  'Nueva Zelanda',
  'Omán',
  'Países Bajos',
  'Pakistán',
  'Palaos',
  'Panamá',
  'Papúa Nueva Guinea',
  'Paraguay',
  'Perú',
  'Polonia',
  'Portugal',
  'Reino Unido',
  'República Centroafricana',
  'República Checa',
  'República del Congo',
  'República Democrática del Congo',
  'República Dominicana',
  'Ruanda',
  'Rumanía',
  'Rusia',
  'Samoa',
  'San Cristóbal y Nieves',
  'San Marino',
  'San Vicente y las Granadinas',
  'Santa Lucía',
  'Santo Tomé y Príncipe',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leona',
  'Singapur',
  'Siria',
  'Somalia',
  'Sri Lanka',
  'Suazilandia',
  'Sudáfrica',
  'Sudán',
  'Sudán del Sur',
  'Suecia',
  'Suiza',
  'Surinam',
  'Tailandia',
  'Tanzania',
  'Tayikistán',
  'Timor Oriental',
  'Togo',
  'Tonga',
  'Trinidad y Tobago',
  'Túnez',
  'Turkmenistán',
  'Turquía',
  'Tuvalu',
  'Ucrania',
  'Uganda',
  'Uruguay',
  'Uzbekistán',
  'Vanuatu',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Yibuti',
  'Zambia',
  'Zimbabue'
];

if (process.env.NODE_ENV !== 'production') {
  // Mock redis wrapper
  jest.mock('../redis/redis-wrapper');




  /**
   * Creates country documents on mongo memory server
   * @function
   */
  const createCountries = async () => {
    const countries = COUNTRIES.map(country => new Country({ name: country }));
    await Country.insertMany(countries);
  }

  let mongo: any;
  beforeAll(async () => {
    process.env.JWT_KEY = 'voicemodtests';
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

  });

  beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
    await createCountries();
    const email = `test-${new Date().getTime()}@test.com`;
    const user: UserAttrs = await buildUserObject(email);
    testUserResponse = await request(app)
      .post('/api/users/signup')
      .send(user)
      .expect(201);

  });

  afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
  });


  global.signin = () => {
    if (!testUserResponse?.body?.id) {
      throw new BadRequestError('Could not sign user in');
    }
    // Build a jwt payload
      const payload = { id: testUserResponse.body.id, email: testUserResponse.body.email };

      // Create jwt
      const token = jwt.sign(payload, process.env.JWT_KEY!);

      // Build session Object
      const session = { jwt: token };

      // Turn that session into json
      const sessionJSON = JSON.stringify(session);

      // Take json and encode it as base64
      const base64 = Buffer.from(sessionJSON).toString('base64');

      // Return a string thats the cookie with the session data
      return [`express:sess=${base64}`];
  };
}
