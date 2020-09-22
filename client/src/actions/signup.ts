import axios from 'axios';

/**
 * Service to sign user up
 * @function
 * @param name User name
 * @param lastname User lastname
 * @param email User email
 * @param password User password
 * @param telephone User phone
 * @param country User country
 * @param postcode User postcode
 * @returns response User signed up
 */
export const signup = async (name: string, lastname: string, email: string,
   password: string, telephone: string, country: string, postcode: string) : Promise<any> => {
  let response = null;
  try {
    response = await axios.post('/api/users/signup',
      { name, lastname, email, password, telephone, country, postcode });
    return response;
  } catch (err) {
    return err.response;
  }
}
