const jwt = require('jsonwebtoken');

function createUnauthorizedError() {
  const error = new Error('Authentication is required.');
  error.status = 401;
  return error;
}

function authenticateToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return next(createUnauthorizedError());
  }

  const token = authorizationHeader.slice('Bearer '.length);

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    return next(createUnauthorizedError());
  }
}

module.exports = authenticateToken;
