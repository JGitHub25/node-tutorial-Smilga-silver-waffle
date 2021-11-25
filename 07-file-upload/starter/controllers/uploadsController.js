const { StatusCodes } = require("http-status-codes");
const path = require("path");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadImageToLocalServer = async (req, res) => {
  //Check if there is a file in the request.
  if (!req.files) {
    throw new CustomError.BadRequestError("Please upload a file.");
  }

  const productImage = req.files.image;

  //Check if the file is an image.
  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload an image.");
  }

  //Check the size of the image.
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError("Please upload an image <1MB.");
  }

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

const uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );

  fs.unlinkSync(req.files.image.tempFilePath);
  //Por qué return en esta función. No creo que se necesite.
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  uploadImage,
};
