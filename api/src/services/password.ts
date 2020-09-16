import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// Convert callback based into promise based
const scryptAsync = promisify(scrypt);

/**
 * Password class to provide hashing and compare functionality
 * @class
 */
export class Password {
  /**
   * Hashes the given password
   * @function
   * @param password Password to hash
   * @returns result Password hashed
   */
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  /**
   * Compares the password stored with the plain password supplied
   * @function
   * @param storedPassword Password in the database
   * @param suppliedPassword Plain password to compare with the database one
   * @returns result Flag indicating whether the password is valid or not 
   */
  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }
}
