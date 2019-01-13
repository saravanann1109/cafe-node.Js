const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const menuRoutes = require("./routes/ItemMaster");
const orderRoutes = require('./routes/order');
const authenticateRoutes = require('./routes/authentication');
mongoose.connect("mongodb://localhost:27017/Cafe");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/user", userRoutes);
app.use("/menu", menuRoutes);
app.use("/placeorder",orderRoutes);
app.use("/orders",orderRoutes);
app.use('/authenticate',authenticateRoutes);
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
app.listen(3000);
console.log("Listening to PORT 3000");
module.exports = app;