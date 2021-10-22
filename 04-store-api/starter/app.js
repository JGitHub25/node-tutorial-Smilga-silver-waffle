//Dependencies.
require("dotenv").config();
require("express-async-errors");

//Imports.
const errorHandlerMiddleware = require("./middleware/error-handler");
const NotFoundMiddleware = require("./middleware/not-found");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

//Express.
const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "<h1>Store API is live!</h1><a href='/products'>See all products</a> "
    );
});

app.use("/api/v1/products", productsRouter);

app.use(NotFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`-------App in ${process.env.NODE_ENV} stage.-------`);
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
