const productsData = require("./products.json");
const ProductModel = require("./models/productModel");
require("dotenv").config();
const connectDB = require("./db/connect");

const populateDB = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await ProductModel.deleteMany();
    await ProductModel.create(productsData);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populateDB();
