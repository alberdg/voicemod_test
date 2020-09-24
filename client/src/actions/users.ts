import axios from 'axios';


/**
 * Service to fetch users
 * @function
 * @returns response Users response
 */
export const fetchUsers = async (page: number, limit: number) : Promise<any> => {
  try {
    const response = await axios.post('/api/users',
      { page, limit },
      {withCredentials: true});
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
    const response = await axios.delete(`/api/users/${userId}`);
    return response;
  } catch (err) {
    return err.response;
  }
}


/**
 * Service to fetch a user by id
 * @function
 * @param user User id to be fetched
 * @returns response Fetch user response
 */
export const fetchUserById = async (userId: string) : Promise<any> => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    return response;
  } catch (err) {
    return err.response;
  }
}

/**
 * Service to update the given user id
 * @function
 * @param userId User id to be updated
 * @param name User name
 * @param lastname User last name
 * @param email User email
 * @param country User country
 * @param telephone User telephone
 * @param postcode User postcode
 * @returns response Update user response
 */
export const updateUser = async (userId: string, name: string, lastname: string,
  email: string, country: string, telephone: string, postcode: string): Promise<any> => {
    try {
      const response = await axios.put(`/api/users/${userId}`,
        { name, lastname, email, country, telephone, postcode });
      return response;
    } catch (err) {
      return err.response;
    }
}

/**
 * Service to update user password
 * @function
 * @returns response Update password response
 */
export const updatePassword = async (userId: string, password: string) : Promise<any> => {
  try {
    const response = await axios.put(`/api/users/${userId}/password`,
      { password });
    return response;
  } catch (err) {
    return err.response;
  }
}
