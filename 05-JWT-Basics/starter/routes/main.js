const express = require("express");
const router = express.Router();
const { login, accessDashboard } = require("../controllers/main");
const authMiddleware = require("../middleware/auth");

router.route("/dashboard").get(authMiddleware, accessDashboard);
router.route("/login").post(login);

module.exports = router;
