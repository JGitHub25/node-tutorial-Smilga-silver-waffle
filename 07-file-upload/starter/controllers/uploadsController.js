const { StatusCodes } = require("http-status-codes");

const uploadImage = async (req, res) => {
  res.send("Image uploaded");
};

module.exports = {
  uploadImage,
};
