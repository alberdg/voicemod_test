import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import { Country } from '../models/country';
import { CountryDoc } from '../models/country';
let countries: CountryDoc[] = [];

/**
 * Builds a test user object
 * @function
 * @returns user User object
 */
export const buildUserObject = async () => {
  if (!Array.isArray(countries) || countries.length === 0) {
    const response = await request(app)
      .get('/api/countries')
      .send();
    countries = response.body;
  }

  return {
    name: 'Jonh',
    lastname: 'Doe',
    email: 'jonh.doe@test.com',
    password: 'jonhdoespas$',
    country: countries[0].id,
    telephone: '+34687014958',
    postcode: '46019',
  };
}

const COUNTRIES = [
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

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

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
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
  await createCountries();
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});


global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
