import request from 'supertest';
import { app } from '../app';
import { UserAttrs } from '../models/user';

/**
 * Helper method to perform signup
 * @function
 * @param user User attributes
 * @returns response Supertest response
 */
export const performSignup = async (user: UserAttrs) => {
  const response = await request(app)
    .post('/api/users/signup')
    .send(user);
  return response;
}
