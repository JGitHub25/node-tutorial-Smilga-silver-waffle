const UserModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const BadRequestError = require("../errors/bad-request");

const register = async (req, res) => {
  const user = await UserModel.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.status(StatusCodes.CREATED).json("login");
};

module.exports = { register, login };
