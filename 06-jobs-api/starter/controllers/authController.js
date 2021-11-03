const UserModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  /*Se puede validar con Mongoose como está o con lógica -if(!name||!email||!password)- como en proyectos anteiores. */
  const user = await UserModel.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.status(StatusCodes.CREATED).json("login");
};

module.exports = { register, login };
