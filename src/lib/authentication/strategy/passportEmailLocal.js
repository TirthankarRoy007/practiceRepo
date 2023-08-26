const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
const UserService = require('../../../services/userService');
const passport = require('passport')

const passportLocalStrategy = new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
}, async (email, password, done) => {
  try {
    const userService = new UserService();
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return done(null, false, { message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return done(null, false, { message: "Invalid credentials" });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserService.getUserById(id)
    .then(user => {
      done(null, user);
    })
    .catch(error => {
      done(error, null);
    });
});

module.exports = passportLocalStrategy;
