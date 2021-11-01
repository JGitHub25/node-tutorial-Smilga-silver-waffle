const CustomErrorAPI = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password) {
    throw new CustomErrorAPI(`A username and password must be provided`, 400);
  }

  res.send("Fake Login/Register/Signup Route");
};

const accessDashboard = (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    message: `Hello, user`,
    secret: `Here's your authorized data. Your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, accessDashboard };
