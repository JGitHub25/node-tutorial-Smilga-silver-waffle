const ProductModel = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res) => {
  res.send("Product created");
};

const getAllProducts = (req, res) => {
  res.send("All products gotten");
};

module.exports = {
  createProduct,
  getAllProducts,
};
