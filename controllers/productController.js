const csv = require("csvtojson");

const Product = require("../models/productModel");
exports.uploadFile = async (req, res, next) => {
  try {
    if (req.files === null) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    const file = req.files.file;
    const replacedfilename = file.name.replace(
      file.name.split(".")[0],
      "products"
    );
    file.mv(`${__dirname}/../uploads/${replacedfilename}`, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      // converting csv to json
      csv()
        .fromFile(`./uploads/products.csv`)
        .then(async (jsonObj) => {
          const products = await Product.create(jsonObj);
          res.status(200).json({
            success: true,
            products,
          });
        });
    });
  } catch (error) {
    console.log(error);
  }
};

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
