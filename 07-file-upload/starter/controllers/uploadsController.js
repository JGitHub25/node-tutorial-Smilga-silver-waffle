const { StatusCodes } = require("http-status-codes");

const uploadImage = async (req, res) => {
  res.send("Product created");
};

module.exports = {
  uploadImage,
};
