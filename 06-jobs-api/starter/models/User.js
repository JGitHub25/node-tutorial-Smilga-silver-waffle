const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  //Antes de guardar el usuario en la db, se hashea el password.
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

UserSchema.methods.checkPassword = async function (sentPassword) {
  const isMatch = await bcrypt.compare(sentPassword, this.password);
  return isMatch;
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
