require("dotenv").config();
require("express-async-errors");

//Security packages.
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

const express = require("express");
const app = express();
const authUserMiddleware = require("./middleware/authentication");

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimiter({ windowMs: 60 * 1000, max: 60 }));

//DB.
const connectDB = require("./db/connect");

//Routers.
const authRouter = require("./routes/authRoutes");
const jobsRouter = require("./routes/jobsRoutes");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
// extra packages

// routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authUserMiddleware, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log(`----------APP in ${process.env.NODE_ENV} stage.`);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
