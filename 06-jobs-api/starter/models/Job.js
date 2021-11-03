const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({});
module.exports = new mongoose.model("Job", JobSchema);
