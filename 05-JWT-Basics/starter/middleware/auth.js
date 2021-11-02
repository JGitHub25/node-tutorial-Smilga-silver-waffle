const jwt = require("jsonwebtoken");
const { AuthError } = require("../errors/index");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AuthError("No valid token provided.");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new AuthError("Not authorized to access this route.");
  }
};

module.exports = authMiddleware;
