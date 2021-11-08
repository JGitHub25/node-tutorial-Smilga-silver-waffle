const UserModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await UserModel.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide an email and password.");
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("User does not exist.");
  }

  const passwordsMatch = await user.checkPassword(password);
  if (!passwordsMatch) {
    throw new UnauthenticatedError("Please provide correct password.");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
