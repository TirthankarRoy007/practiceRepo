require('dotenv').config();
const express = require("express");
const userRoute = require("./routes/userRoute");
const boardRoute = require("./routes/boardRoute");
const cardRoute = require("./routes/cardRoute");
const listRoute = require("./routes/listRoute");

const { default: mongoose } = require("mongoose");
const app = express();

app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));

// const BootstrapData = require("../src/lib/bootstrap");

// (async () => {
//   try {
//     await BootstrapData();
//     console.log('Bootstrap completed successfully');
//   } catch (error) {
//     console.error('Bootstrap failed:', error);
//   }
// })();

app.use("/", userRoute);
app.use("/", boardRoute);
app.use("/", cardRoute);
app.use("/", listRoute);

app.listen(3000, function () {
  console.log("Express App is running on port " + 3000);
});
