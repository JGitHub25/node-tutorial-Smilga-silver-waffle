const ProductsModel = require("../models/productModel");

const getAllProductsStatic = async (req, res) => {
  const products = await ProductsModel.find({}).sort("-name").limit(3);
  res.status(200).json({
    msg: "Products testing route.",
    nbHits: products.length,
    products,
  });
};
const getAllProducts = async (req, res) => {
  //Se extraen la propiedades que interesan.
  const { featured, company, name } = req.query;
  const queryObj = {};
  //Se verifica si las propiedades se pasaron/existen.
  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObj.company = company;
  }
  if (name) {
    queryObj.name = { $regex: `^${name}`, $options: "i" };
  }
  console.log(queryObj);
  //No se pasa req.query directamente sino otro objeto.
  const products = await ProductsModel.find(queryObj);
  res
    .status(200)
    .json({ msg: "Products route.", nbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
