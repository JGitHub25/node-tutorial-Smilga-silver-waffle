const login = async (req, res) => {
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
