const ProductsModel = require("../models/productModel");

const getAllProductsStatic = async (req, res) => {
  const products = await ProductsModel.find({}).select("name price").limit(3);
  res.status(200).json({
    msg: "Products testing route.",
    nbHits: products.length,
    products,
  });
};
const getAllProducts = async (req, res) => {
  //Se extraen la propiedades que interesan.
  const { featured, company, name, sort, selectors } = req.query;
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
  console.log("queryObject");
  console.log(queryObj);
  //No se pasa req.query directamente sino otro objeto.
  let result = ProductsModel.find(queryObj);

  if (sort) {
    const sortTerms = sort.split(",").join(" ");
    console.log(`The terms to sort are: ${sortTerms}`);
    result = result.sort(sortTerms);
  } else {
    //Default sort.
    result = result.sort("-createdAt");
  }

  if (selectors) {
    const selectionTerms = selectors.split(",").join(" ");
    console.log(`The terms to select are: ${selectionTerms}`);
    result = result.select(selectionTerms);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = Number(page - 1) * limit;
  //Este 'result' viene de unq query con .find().
  result = result.skip(skip).limit(limit);

  //Se puede aguantar hasta aquí la resolución del Query object (después de haberle aplicado .find() y .sort()).
  const products = await result;

  res
    .status(200)
    .json({ msg: "Products route.", nbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
