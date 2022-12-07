const csv = require("csvtojson");
const catchAsyncError = require("../middleware/catchAsyncError");

const Product = require("../models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
exports.uploadFile = catchAsyncError(async (req, res, next) => {
  if (req.files === null) {
    return next(new ErrorHandler("No file Uploaded", 400));
  }
  const file = req.files.file;
  const replacedfilename = file.name.replace(
    file.name.split(".")[0],
    "products"
  );
  file.mv(`${__dirname}/../uploads/${replacedfilename}`, (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorHandler(err.message, 500));
    }
    // converting csv to json
    csv()
      .fromFile(`./uploads/products.csv`)
      .then(async (jsonObj) => {
        jsonObj.forEach(async (obj) => {
          const productExist = await Product.findOne({ ID: obj.ID });
          if (productExist) {
            return next(
              new ErrorHandler("Product Already Exist is the database", 409)
            );
          }
        });
        const products = await Product.create(jsonObj);
        res.status(200).json({
          success: true,
          products,
        });
      });
  });
});

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
  }
};
