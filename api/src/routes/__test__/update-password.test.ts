import request from 'supertest';
import { app } from '../../app';
import { UserAttrs, User } from '../../models/user';
import { buildUserObject } from '../../test/setup';
import { performSignup } from '../../test/utils';

it('returns a 200 on successful password update', async () => {
  const user: UserAttrs = await buildUserObject();
  const response = await performSignup(user);

  const password: string = `password_modified`;
  const updated = await request(app)
    .put(`/api/users/${response.body.id}/password`)
    .send({ password })
    .expect(200);
  console.log(updated.body);
  expect(updated.body).not.toBeNull();
  expect(updated.body.id).toEqual(response.body.id);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: user.email,
      password
    })
    .expect(200);
});

it('returns a 400 with an empty password', async () => {
  const user: UserAttrs = await buildUserObject();
  const response = await performSignup(user);

  await request(app)
    .put(`/api/users/${response.body.id}/password`)
    .send({})
    .expect(400);
});

it('returns a 400 with an invalid user id', async () => {
  await request(app)
    .put(`/api/users/123456789123456789012345/password`)
    .send({})
    .expect(400);
});
