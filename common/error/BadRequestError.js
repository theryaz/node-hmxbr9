class BadRequestError extends Error {
  constructor(message = 'Bad request') {
    super();
    this.message = message;
    this.httpStatus = 400;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = { BadRequestError };