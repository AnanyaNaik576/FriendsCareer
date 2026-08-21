const { ZodError } = require('zod');

function errorHandler(error, req, res, next) { // eslint-disable-line no-unused-vars
  let status = error.status || 500;
  let message = error.message || 'Something went wrong.';

  if (error instanceof ZodError) {
    status = 400;
    message = error.issues.map((issue) => issue.message).join(' ');
  } else if (error.type === 'entity.parse.failed') {
    status = 400;
    message = 'Request body must be valid JSON.';
  } else if (error.name === 'CastError') {
    status = 400;
    message = 'The provided ID is not valid.';
  } else if (error.name === 'ValidationError') {
    status = 400;
    message = Object.values(error.errors).map((item) => item.message).join(' ');
  } else if (error.code === 11000) {
    // MongoDB uses 11000 for duplicate unique fields, which is a client-side conflict.
    status = 409;
    message = 'A record with that value already exists.';
  }

  if (status >= 500) {
    console.error(error);
    message = 'Internal server error.';
  }

  res.status(status).json({ message, status });
}

module.exports = errorHandler;
