import request from 'supertest';
import { app } from '../../app';
import { UserAttrs } from '../../models/user';
import { buildUserObject } from '../../test/setup';
import { performSignup } from '../../test/utils';

it('deletes the user with the given id', async () => {
  const user: UserAttrs = await buildUserObject();
  const userB: UserAttrs = await buildUserObject();
  userB.email = 'deleteme@test.com';
  const response = await performSignup(user);
  const responseB = await performSignup(userB);


  const deleteResponse = await request(app)
    .delete(`/api/users/${responseB.body.id}`)
    .send()
    .expect(200);
  expect(deleteResponse.body).not.toBeNull();
  expect(deleteResponse.body.length).toEqual(1);
  expect(deleteResponse.body[0].id).toEqual(response.body.id);
});
