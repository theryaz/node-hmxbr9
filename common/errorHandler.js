function errorHandler(error, req, res, next) {
  if (error === null) {
    return next();
  }
  let errorResponse = null;
  let errorStatus = 500;
  if (error.httpStatus) {
    errorStatus = error.httpStatus;
    errorResponse = {
      message: error.message,
    };
  }
  res.status(errorStatus).json(errorResponse);
}

module.exports = errorHandler;
