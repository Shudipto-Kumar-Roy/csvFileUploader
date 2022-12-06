const express = require("express");
const {
  uploadFile, getAllProducts,
} = require("../controllers/productController");
const router = express.Router();

router.route("/uploadfile").post(uploadFile);
router.route("/getallproducts").get(getAllProducts);
module.exports = router;
