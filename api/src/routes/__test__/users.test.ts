import request from 'supertest';
import { app } from '../../app';
import { UserAttrs } from '../../models/user';
import { performSignup } from '../../test/utils';
import { buildUserObject } from '../../test/setup';

it('Can fetch users', async () => {
  const userA: UserAttrs = await buildUserObject();
  const userB: UserAttrs = await buildUserObject();
  userB.email = 'random@test.com';
  await performSignup(userA);
  await performSignup(userB);
  const response = await request(app)
    .get('/api/users')
    .send()
    .expect(200);

  expect(response).not.toBeNull();
  expect(response.body).not.toBeNull();
  expect(response.body.length).toEqual(2);
  expect(response.body[0].email).toEqual(userA.email);
  expect(response.body[1].email).toEqual(userB.email);

});
