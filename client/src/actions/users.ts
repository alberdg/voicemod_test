import axios from 'axios';
import { SERVER_URL } from '../constants';

/**
 * Service to fetch users
 * @function
 * @returns response Users response
 */
export const fetchUsers = async () : Promise<any> => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/users`);
    return response;
  } catch (err) {
    return err.response;
  }
}

/**
 * Service to delete the given user
 * @function
 * @param userId Id of user to delete
 * @returns response Delete user response
 */
export const deleteUser = async (userId: string) : Promise<any> => {
  try {
    const response = await axios.delete(`${SERVER_URL}/api/users/${userId}`);
    return response;
  } catch (err) {
    return err.response;
  }
}
