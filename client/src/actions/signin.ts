import axios from 'axios';
import { SERVER_URL } from '../constants';

/**
 * Service to sign user in
 * @function
 * @param email User email
 * @param password User password
 * @returns response User signed in
 */
export const signin = async (email: string, password: string): Promise<any> => {
  const response = await axios.post(`${SERVER_URL}/api/users/signin`,
    { email, password });
  return response;
}
