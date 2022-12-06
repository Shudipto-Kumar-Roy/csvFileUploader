const csv = require("csvtojson");

exports.uploadFile = async (req, res, next) => {
  let result = [];
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
      csv()
        .fromFile(`./uploads/products.csv`)
        .then((jsonObj) => {
          res.status(200).json({
            fileName: replacedfilename,
            filePath: `/${file.path}`,
            products: jsonObj,
          });
        });
    });
  } catch (error) {
    console.log(error);
  }
};
