const CustomErrorAPI = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password) {
    throw new CustomErrorAPI(`A username and password must be provided`, 400);
  }
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ message: "User created", token });
};

const accessDashboard = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomErrorAPI("No valid token provided.", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const luckyNumber = Math.floor(Math.random() * 100);
    //Respond.
    res.status(200).json({
      message: `Hello, ${decoded.username}`,
      secret: `Here's your authorized data. Your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomErrorAPI("Not authorized to access this route.", 401);
  }
};

module.exports = { login, accessDashboard };
