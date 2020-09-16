import request from 'supertest';
import { app } from '../../app';

it('Returns list of countries', async () => {
  const response = await request(app)
    .get('/api/countries')
    .send({});
  expect(response.status).toEqual(200);
  expect(response.body).not.toBeNull();
  expect(response.body.length).toEqual(194);
});
