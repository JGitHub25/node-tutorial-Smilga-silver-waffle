const ProductModel = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res) => {
  console.log(req.body);

  const product = await ProductModel.create(req.body);
  console.log(product);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = (req, res) => {
  res.send("All products gotten");
};

module.exports = {
  createProduct,
  getAllProducts,
};
