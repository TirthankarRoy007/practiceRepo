const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { SECRET_KEY } = require('../lib/config/config');
const MESSAGES = require('../utils/messages');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY
};

passport.use(
  new JwtStrategy(jwtOptions, (payload, done) => {
    const user = {
      id: payload.userId,
      email: payload.email,
      role: payload.role
    };

    return done(null, user);
  })
);

function authenticateUser(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return res.status(401).json({ message: MESSAGES.INVALID_TOKEN });
    }
    if (!user) {
      return res.status(401).json({ message: MESSAGES.AUTH_TOKEN_NOT_PROVIDED });
    }
    req.user = user;
    next();
  })(req, res, next);
}

function authorizeAdmin(req, res, next) {
  if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
    return res.status(403).json({ message: MESSAGES.UNAUTHORIZED_ACTION });
  }
  next();
}

module.exports = { authenticateUser, authorizeAdmin };