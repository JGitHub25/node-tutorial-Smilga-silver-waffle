const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name."],
    trim: true,
    minlength: 4,
    maxlength: 50,
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
    minlength: 8,
  },
  email: {
    type: String,
    required: [true, "Please enter an email."],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email.",
    ],
    unique: true,
  },
});

const UserModel = new mongoose.model("User", UserSchema);

module.exports = UserModel;
