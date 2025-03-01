const colors = require('colors')
const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();

// MongoDB
const MongoDB = mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("+ MongoDB Connected".green.bold))
  .catch((err) => console.error("MongoDB Connection Error:", err));

module.exports = MongoDB;