import request from 'supertest';
import { app } from '../../app';
import { UserAttrs } from '../../models/user';
import { buildUserObject } from '../../test/setup';

const performSignup = async (user: UserAttrs) => {
  const response = await request(app)
    .put('/api/users/signup')
    .send(user);
  return response
}

it('returns a 200 on successful update', async () => {
  const user: UserAttrs = await buildUserObject();
  const response = await performSignup(user);
  user.name = `${user.name}_updated`
  const updated = await request(app)
    .put(`/api/users/${response.body.id}`)
    .send(user)
    .expect(200);
  expect(updated.body).not.toBeNull();
  expect(updated.body.name === user.name);
});

it('returns a 400 with an invalid name', async () => {
  const user: UserAttrs = await buildUserObject();
  const response = await performSignup(user);
  user.name = '';
  return request(app)
    .put(`/api/users/${response.body.id}`)
    .send(user)
    .expect(400);
});

it('returns a 400 with an invalid last name', async () => {
  const user: UserAttrs = await buildUserObject();
  const response = await performSignup(user);
  user.lastname = '';
  return request(app)
    .put(`/api/users/${response.body.id}`)
    .send(user)
    .expect(400);
});

it('returns a 400 with an invalid email', async () => {
  const user: UserAttrs = await buildUserObject();
  const response = await performSignup(user);
  user.email = '';
  return request(app)
    .put(`/api/users/${response.body.id}`)
    .send(user)
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  const user: UserAttrs = await buildUserObject();
  const response = await performSignup(user);
  user.password = '';
  return request(app)
    .put(`/api/users/${response.body.id}`)
    .send(user)
    .expect(400);
});


it('returns a 400 with an invalid country', async () => {
  const user = await buildUserObject();
  const response = await performSignup(user);
  const fakeCountryId = 'fakeId';
  user.country = fakeCountryId;
  return request(app)
    .put(`/api/users/${response.body.id}`)
    .send(user)
    .expect(400);
});

it('returns a 400 with an invalid telephone', async () => {
  const user: UserAttrs = await buildUserObject();
  const response = await performSignup(user);
  user.telephone = '';
  return request(app)
    .put(`/api/users/${response.body.id}`)
    .send(user)
    .expect(400);
});

it('returns a 400 with an invalid postcode', async () => {
  const user: UserAttrs = await buildUserObject();
  const response = await performSignup(user);
  user.postcode = '';
  return request(app)
    .put(`/api/users/${response.body.id}`)
    .send(user)
    .expect(400);
});


it('disallows duplicate emails', async () => {
  const user: UserAttrs = await buildUserObject();
  const response = await performSignup(user);
  await request(app)
    .put(`/api/users/${response.body.id}`)
    .send(user)
    .expect(400);
});


it('sets a cookie after successful signup', async () => {
  const user: UserAttrs = await buildUserObject();
  const response = await performSignup(user);
  const updateResponse = await request(app)
    .put(`/api/users/${response.body.id}`)
    .send(user)
    .expect(200);

  expect(updateResponse.get('Set-Cookie')).toBeDefined();
});
