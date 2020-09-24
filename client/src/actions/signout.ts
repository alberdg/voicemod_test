import axios from 'axios';

/**
 * Service to sign user out
 * @function
 * @returns response Sign out response
 */
export const signout = async (): Promise<any> => {
  try {
    const response = await axios.post('/api/users/signout');
    return response;
  } catch (err) {
    return err.response;
  }
}
