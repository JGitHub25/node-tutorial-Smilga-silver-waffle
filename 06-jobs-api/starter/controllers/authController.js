const UserModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const tempUser = { name, email, password: hashedPassword };

  /*Se puede validar con Mongoose como está o con lógica -if(!name||!email||!password)- como en proyectos anteiores. */
  const user = await UserModel.create({ ...tempUser });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.status(StatusCodes.CREATED).json("login");
};

module.exports = { register, login };
