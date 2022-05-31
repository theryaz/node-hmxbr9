class UserNotFoundError extends Error {
  constructor() {
    this.message = 'The user could not be found';
    this.httpStatus = 404;
    Error.captureStackTrace(this, this.constructor);
  }
}
