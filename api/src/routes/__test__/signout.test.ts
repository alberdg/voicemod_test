import request from 'supertest';
import { app } from '../../app';
import { buildUserObject } from '../../test/setup';
import { UserAttrs } from '../../models/user';
import { performSignup } from '../../test/utils';


it('clears the cookie after signing out', async () => {
  const user: UserAttrs = await buildUserObject();
  await performSignup(user);
  
  const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);

  expect(response.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
