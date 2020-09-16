import { CustomError } from './custom-error';

/**
 * Class representing an error connecting to the database
 * @class
 */
export class DatabaseConnectionError extends CustomError {
  statusCode: number = 500;
  reason: string = 'Error connecting to database';

  constructor() {
    super('Error connecting to db');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
