require('dotenv').config();
const { SECRET_KEY } = require('../src/lib/config/config');
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require('bcrypt');
const LocalStrategy = require("passport-local").Strategy;
const { default: mongoose } = require("mongoose");
const UserService = require('./services/userService');
const User = require('./models/user')
const userRoute = require("./routes/userRoute");
const boardRoute = require("./routes/boardRoute");
const cardRoute = require("./routes/cardRoute");
const listRoute = require("./routes/listRoute");

const app = express();

app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));

app.use(session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
}, async (email, password, done) => {
  try {
    const userService = new UserService();
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return done(null, false, { message: MESSAGES.INVALID_CREDENTIALS });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return done(null, false, { message: MESSAGES.INVALID_CREDENTIALS });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

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

app.use("/", userRoute);
app.use("/", boardRoute);
app.use("/", cardRoute);
app.use("/", listRoute);

app.listen(3000, function () {
  console.log("Express App is running on port " + 3000);
});
