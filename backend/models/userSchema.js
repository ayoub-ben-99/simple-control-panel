const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, required: true },
    age: { type: String, required: true },
    country: { type: String, required: true },
    gender: { type: String, required: true }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
