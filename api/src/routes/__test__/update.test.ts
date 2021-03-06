import request from 'supertest';
import { app } from '../../app';
import { UserAttrs, User } from '../../models/user';
import { Password } from '../../services/password';
import { buildUserObject } from '../../test/setup';

import { performSignup } from '../../test/utils';

it('returns a 200 on successful update', async () => {
  const user: UserAttrs = await buildUserObject();
  const response = await performSignup(user);
  user.name = `${user.name}_updated`;
  user.newpassword = 'newpassword';
  const cookie: string[] = global.signin();
  const updated = await request(app)
    .put(`/api/users/${response.body.id}`)
    .set('Cookie', cookie)
    .send(user)
    .expect(200);
  expect(updated.body).not.toBeNull();
  expect(updated.body.name === user.name);
});

it('successfully update the user in the database', async () => {
  const user: UserAttrs = await buildUserObject();
  const response = await performSignup(user);
  user.name = `${user.name}_updated`;
  user.newpassword = 'newpassword';
  const cookie: string[] = global.signin();
  await request(app)
    .put(`/api/users/${response.body.id}`)
    .set('Cookie', cookie)
    .send(user)
    .expect(200);
  const updatedUser = await User.findOne({ _id: response.body.id });
  const hashedPassword = Password.toHash(user.password);
  expect(updatedUser).not.toBeNull();
  expect(updatedUser!.password).not.toEqual(hashedPassword);
  expect(updatedUser!.name).toEqual(user.name);
});

it('returns a 400 with an invalid name', async () => {
  const user: UserAttrs = await buildUserObject();
  const response = await performSignup(user);
  user.name = '';
  user.newpassword = 'newpassword';
  const cookie: string[] = global.signin();
  await request(app)
    .put(`/api/users/${response.body.id}`)
    .set('Cookie', cookie)
    .send(user)
    .expect(400);
});

it('returns a 400 with an invalid last name', async () => {
  const user: UserAttrs = await buildUserObject();
  const response = await performSignup(user);
  user.lastname = '';
  user.newpassword = 'newpassword';
  const cookie: string[] = global.signin();
  await request(app)
    .put(`/api/users/${response.body.id}`)
    .set('Cookie', cookie)
    .send(user)
    .expect(400);
});

it('returns a 400 with an invalid email', async () => {
  const user: UserAttrs = await buildUserObject();
  const response = await performSignup(user);
  user.email = '';
  user.newpassword = 'newpassword';
  const cookie: string[] = global.signin();
  await request(app)
    .put(`/api/users/${response.body.id}`)
    .set('Cookie', cookie)
    .send(user)
    .expect(400);
});


it('returns a 400 with an invalid country', async () => {
  const user: any = await buildUserObject();
  const response = await performSignup(user);
  const fakeCountryId = 'fakeId';
  user.country = fakeCountryId;
  user.newpassword = 'newpassword';
  const cookie: string[] = global.signin();
  await request(app)
    .put(`/api/users/${response.body.id}`)
    .set('Cookie', cookie)
    .send(user)
    .expect(400);
});

it('returns a 400 with an invalid telephone', async () => {
  const user: UserAttrs = await buildUserObject();
  const response = await performSignup(user);
  user.telephone = '';
  user.newpassword = 'newpassword';
  const cookie: string[] = global.signin();
  await request(app)
    .put(`/api/users/${response.body.id}`)
    .set('Cookie', cookie)
    .send(user)
    .expect(400);
});

it('returns a 400 with an invalid postcode', async () => {
  const user: UserAttrs = await buildUserObject();
  const response = await performSignup(user);
  user.postcode = '';
  user.newpassword = 'newpassword';
  const cookie: string[] = global.signin();
  await request(app)
    .put(`/api/users/${response.body.id}`)
    .set('Cookie', cookie)
    .send(user)
    .expect(400);
});


it('disallows duplicate emails', async () => {
  const user: UserAttrs = await buildUserObject();
  const userB: UserAttrs = { ...user, email: 'anotheremail@test.com' };
  const response = await performSignup(user);
  await performSignup(userB);
  user.email = 'anotheremail@test.com';
  user.newpassword = 'newpassword';
  const cookie: string[] = global.signin();
  await request(app)
    .put(`/api/users/${response.body.id}`)
    .set('Cookie', cookie)
    .send(user)
    .expect(400);
});


it('sets a cookie after successful update', async () => {
  const user: UserAttrs = await buildUserObject();
  const response = await performSignup(user);
  user.newpassword = 'newpassword';
  const cookie: string[] = global.signin();
  const updateResponse = await request(app)
    .put(`/api/users/${response.body.id}`)
    .set('Cookie', cookie)
    .send(user)
    .expect(200);

  expect(updateResponse.get('Set-Cookie')).toBeDefined();
});
