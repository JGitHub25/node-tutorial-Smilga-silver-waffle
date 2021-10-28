const ProductsModel = require("../models/productModel");

const getAllProductsStatic = async (req, res) => {
  const products = await ProductsModel.find({ price: { $eq: 109 } });
  res.status(200).json({
    msg: "Products testing route.",
    nbHits: products.length,
    products,
  });
};
const getAllProducts = async (req, res) => {
  //Se extraen la propiedades que interesan.
  const { featured, company, name, sort, selectors, numericFilters } =
    req.query;
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
  //Si se pasaron numericFilters...
  if (numericFilters) {
    //Para hacerlo más amigable, el usuario ingreso los operadores tradicionales. Los convertimos a los que usa Mongoose.
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(filters);
    //Nos aseguramos de aplicar el filtro numérico sólo a las propiedades numéricas -price y rating en este caso-.
    //Procesamos más la query string para que quede en la sintáxis que necesita Mongoose.
    //Pasamos la condición al queryObj.
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) };
      }
    });
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
