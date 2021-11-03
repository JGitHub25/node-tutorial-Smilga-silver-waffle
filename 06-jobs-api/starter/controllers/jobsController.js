const { StatusCodes } = require("http-status-codes");

const getAllJobs = async (req, res) => {
  res.status(StatusCodes.OK).send("get all jobs");
};

const getOneJob = async (req, res) => {
  res.status(StatusCodes.OK).send("get a jobs");
};

const createJob = async (req, res) => {
  res.status(StatusCodes.OK).send("create job");
};

const updateJob = async (req, res) => {
  res.status(StatusCodes.OK).send("update job");
};
const deleteJob = async (req, res) => {
  res.status(StatusCodes.OK).send("delete job");
};

module.exports = { getAllJobs, getOneJob, createJob, updateJob, deleteJob };
