import request from 'supertest';
import { app } from '../../app';
import { User } from '../../models/user';
import { buildUserObject } from '../../test/setup';

it('deletes the user with the given id', async () => {
  const user = await buildUserObject();
  const response = await request(app)
    .post('/api/users/signup')
    .send(user)
    .expect(201);

  const deleteResponse = await request(app)
    .delete(`/api/users/${response.body.id}`)
    .send()
    .expect(200);
  expect(deleteResponse.body.ok).toEqual(1);
  expect(deleteResponse.body.deletedCount).toEqual(1);
  const userCount = await User.findOne({ _id: response.body.id }).countDocuments();
  expect(userCount).toEqual(0);
});
