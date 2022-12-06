const express = require("express");
const {
  uploadFile,
  convertFile,
} = require("../controllers/fileUploadController");
const router = express.Router();

router.route("/uploadfile").post(uploadFile);
module.exports = router;
