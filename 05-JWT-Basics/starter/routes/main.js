const express = require("express");
const router = express.Router();
const { login, accessDashboard } = require("../controllers/main");

router.route("/dashboard").get(accessDashboard);
router.route("/login").post(login);

module.exports = router;
