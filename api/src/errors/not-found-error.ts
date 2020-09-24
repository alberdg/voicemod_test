import { CustomError } from './custom-error';

/**
 * Class representing a Not found error
 * @class
 */
export class NotFoundError extends CustomError {
  statusCode: number = 404;
  url: string = '';
  constructor(url: string) {
    super(`Route ${url} was not found`);
    this.url = url;

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: `Route ${this.url} was not found` }];
  }
}
