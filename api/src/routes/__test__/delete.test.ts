import request from 'supertest';
import { app } from '../../app';
import { UserAttrs } from '../../models/user';
import { buildUserObject } from '../../test/setup';
import { performSignup } from '../../test/utils';

it('deletes the user with the given id', async () => {
  const user: UserAttrs = await buildUserObject();
  const userB: UserAttrs = await buildUserObject();
  const userC: UserAttrs = await buildUserObject();
  const userD: UserAttrs = await buildUserObject();
  userB.email = 'deleteme@test.com';
  userC.email = 'deletemeC@test.com';
  userD.email = 'deletemeD@test.com';
  const response = await performSignup(user);
  const responseB = await performSignup(userB);
  await performSignup(userC);
  await performSignup(userD);

  const cookie: string[] = global.signin();
  const deleteResponse = await request(app)
    .delete(`/api/users/${responseB.body.id}`)
    .set('Cookie', cookie)
    .send({ limit: 3 })
    .expect(200);
  expect(deleteResponse.body).not.toBeNull();
  expect(deleteResponse.body.users?.length).toEqual(3);
  expect(deleteResponse.body.users[1]?.id).toEqual(response.body.id);
});
