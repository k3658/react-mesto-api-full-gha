const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');
const { errorMessages } = require('../errors/errors');

const { SECRET_KEY } = require('../env.config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(errorMessages.MESSAGE_ERROR_UNAUTHORIZED);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnauthorizedError(errorMessages.MESSAGE_ERROR_UNAUTHORIZED);
  }

  req.user = payload;

  next();
};

module.exports = auth;
