require('dotenv').config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const boardRoute = require("./routes/boardRoute");
const cardRoute = require("./routes/cardRoute");
const listRoute = require("./routes/listRoute");
const passportLocalStrategy = require('./lib/authentication/strategy/passportEmailLocal');

const app = express();

app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(passportLocalStrategy); 

app.use("/", userRoute);
app.use("/", boardRoute);
app.use("/", cardRoute);
app.use("/", listRoute);

app.listen(3000, function () {
  console.log("Express App is running on port " + 3000);
});
