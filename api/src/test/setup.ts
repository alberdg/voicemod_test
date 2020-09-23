import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import { BadRequestError } from '../errors/bad-request-error';
import { UserAttrs } from '../models/user';
import { Country } from '../models/country';
import { CountryDoc } from '../models/country';
import { COUNTRIES } from '../constants';
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
