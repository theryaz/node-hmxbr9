function errorHandler(error, req, res, next) {
  if (error === null) {
    return next();
  }
  let errorResponse;
  let errorStatus = 500;
  if (error.httpStatus) {
    errorStatus = error.httpStatus;
    errorResponse = {
      message: error.message,
    };
  }
  console.error("Handled Error", error);
  res.status(errorStatus).json(errorResponse);
  next(error);
}

module.exports = errorHandler;
