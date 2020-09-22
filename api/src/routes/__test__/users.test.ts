import request from 'supertest';
import { app } from '../../app';
import { UserAttrs } from '../../models/user';
import { performSignup } from '../../test/utils';
import { buildUserObject } from '../../test/setup';

it('Can fetch users', async () => {
  const userA: UserAttrs = await buildUserObject();
  const userB: UserAttrs = await buildUserObject();
  const userC: UserAttrs = await buildUserObject();
  const userD: UserAttrs = await buildUserObject();
  userB.email = 'random@test.com';
  userC.email = 'randomC@test.com';
  userD.email = 'randomD@test.com';
  await performSignup(userA);
  await performSignup(userB);
  await performSignup(userC);
  await performSignup(userD);
  const cookie: string[] = global.signin();
  const response = await request(app)
    .post('/api/users')
    .set('Cookie', cookie)
    .send({ page: 0, limit: 3 })
    .expect(200);

  expect(response).not.toBeNull();
  expect(response.body).not.toBeNull();
  expect(response.body.users?.length).toEqual(3);
  expect(response.body.users[1]?.email).toEqual(userA.email);
  expect(response.body.users[2]?.email).toEqual(userB.email);

});
