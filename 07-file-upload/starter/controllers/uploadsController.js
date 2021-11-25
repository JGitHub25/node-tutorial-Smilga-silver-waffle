const { StatusCodes } = require("http-status-codes");
const path = require("path");

const uploadImage = async (req, res) => {
  const productImage = req.files.image;

  const imagePath = path.join(
    __dirname,
    `../public/uploads/${productImage.name}`
  );

  await productImage.mv(imagePath);

  //Por qué return en esta función. No creo que se necesite.
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = {
  uploadImage,
};
