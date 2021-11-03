const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getOneJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobsController");

router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/:id", getOneJob);
router.patch("/:id", updateJob);
router.get("/:id", deleteJob);

module.exports = router;
