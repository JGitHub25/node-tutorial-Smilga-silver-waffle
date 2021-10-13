require("./db/connect");
const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
const connectDB = require("./db/connect");

const tasksRouter = require("./routes/tasks");
const notFound = require("./middleware/not-found");

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasksRouter);
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log(`CONNECTED TO DB...`);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
