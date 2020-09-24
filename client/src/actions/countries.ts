import axios from 'axios';

/**
 * Service to fetch countries
 * @function
 * @returns response Fetch countries response
 */
export const fetchCountries = async (): Promise<any> => {
  try {
    const response = await axios.get('/api/countries');
    return response;
  } catch (err) {
    return err.response;
  }
}
