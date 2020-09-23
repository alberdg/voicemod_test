import { SIGNED_IN_USER } from '../constants';
/**
 * Validates an email address
 * @function
 * @param email Email to validate
 * @returns flag Flag indicating if the email is valid or not
 */
export const isValidEmail = (email: string) : boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

/**
 * Validates a password
 * @function
 * @param password Password to validate
 * @returns flag Flag indicating if the password is valid or not
 */
export const isValidPassword = (password: string) : boolean => {
  const trimmedLength = password ? password.trim().length : 0;
  return trimmedLength > 3 && trimmedLength < 21;
}

/**
 * Checks whether the user can access the protected resource
 * @function
 * @param history Browser history
 * @param setUnauthorized Sets unauthorized flag
 */
export const checkAuthorization = (history: any, setUnauthorized: Function) : void => {
  const authenticatedUser = localStorage.getItem(SIGNED_IN_USER);
  if (!authenticatedUser) {
    setUnauthorized(true);
    history.push('/');
    return;
  }
  setUnauthorized(false);
}
