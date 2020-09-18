import axios from 'axios';
import { SERVER_URL } from '../constants';

/**
 * Service to fetch countries
 * @function
 * @returns response Fetch countries response
 */
export const fetchCountries = async (): Promise<any> => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/countries`);
    return response.data;
  } catch (err) {
    return null;
  }
}
