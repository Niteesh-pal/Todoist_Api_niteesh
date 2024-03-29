const jwt = require('jsonwebtoken');
const util = require('util');
const db = require('../../config/db_connect');

const authUser = async (req, res, next) => {
  const testToken = req.headers.authorization;

  let token;
  if (testToken && testToken.startsWith('bearer')) {
    token = testToken.split(' ')[1];
  }

  if (!token || !testToken) {
    const error = new Error('Please log in!');
    error.statusCode = 401;
    next(error);
  }

  try {
    const { id } = jwt.verify(token, process.env.TOKEN_SECRET_STRING);

    const user = await db.User.findByPk(id);

    if (!user) {
      const error = new Error('User does not exist');
      error.statusCod = 401;
      return next(error);
    }

    req.userId = id;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      const error = new Error('Invalid token, Please login again');
      error.statusCode = 401;
      return next(error);
    }

    if (error.name === 'TokenExpiredError') {
      const error = new Error('Token Expired, Please login again');
      error.statusCode = 401;
      return next(error);
    }

    next(new Error(error.message));
  }
};

module.exports = authUser;
