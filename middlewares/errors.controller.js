const globalErrorHandler = (
  err,
  req,
  res,
  next
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err,
  });
};

module.exports = globalErrorHandler;