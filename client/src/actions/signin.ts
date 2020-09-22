import axios from 'axios';

/**
 * Service to sign user in
 * @function
 * @param email User email
 * @param password User password
 * @returns response User signed in
 */
export const signin = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axios.post('/api/users/signin',
      { email, password });
    return response;
  } catch (err) {
    return err.response;
  }
}
