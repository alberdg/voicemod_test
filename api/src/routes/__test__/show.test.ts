import request from 'supertest';
import { app } from '../../app';
import { UserAttrs, UserDoc } from '../../models/user';
import { performSignup } from '../../test/utils';
import { buildUserObject } from '../../test/setup';

it('Can fetch a user by id', async () => {
  const userA: UserAttrs = await buildUserObject();

  const signupResponse = await performSignup(userA);
  const user: UserDoc = signupResponse.body;
  const cookie: string[] = global.signin();
  const response = await request(app)
    .get(`/api/users/${user.id}`)
    .set('Cookie', cookie)
    .send()
    .expect(200);
  expect(response).not.toBeNull();
  expect(response.body).not.toBeNull();
  expect(response.body.name).toEqual(userA.name);
  expect(response.body.lastname).toEqual(userA.lastname);
  expect(response.body.email).toEqual(userA.email);
});
