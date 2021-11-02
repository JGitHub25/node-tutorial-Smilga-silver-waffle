const { BadRequest } = require("../errors/index");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password) {
    throw new BadRequest(`A username and password must be provided`);
  }
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ message: "User created", token });
};

const accessDashboard = (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  //Respond.
  res.status(200).json({
    message: `Hello, ${req.user.username}`,
    secret: `Here's your authorized data. Your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, accessDashboard };
