const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const apiroute=require('./routes/api')
const authroute=require('./routes/auth')
const morgan=require('morgan')
app.use(express.json());
app.use(morgan('common'))
const port = process.env.PORT || 5000;
mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("db Connected successfully");
});
// app.use('/api',apiroute)
app.use('/api/auth',authroute)

app.listen(process.env.PORT, () => {
  console.log(`port running on ${port}`);
});
