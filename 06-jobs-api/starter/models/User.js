const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const UserModel = new mongoose.model("User", UserSchema);

module.exports = UserModel;
