import { Country } from './country';
/**
 * Interface representing a user
 * @interface
 */
export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password?: string;
  telephone: string;
  country: Country;
  postcode: string;
};
