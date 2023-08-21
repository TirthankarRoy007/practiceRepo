const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../lib/config/config');
const MESSAGES = require('../utils/messages');

function authenticateUser(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: MESSAGES.AUTH_TOKEN_NOT_PROVIDED });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: MESSAGES.INVALID_TOKEN });
  }
}

function authorizeAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: MESSAGES.UNAUTHORIZED_ACTION });
  }

  next();
}

module.exports = { authenticateUser, authorizeAdmin };