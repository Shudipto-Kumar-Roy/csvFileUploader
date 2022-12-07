const express = require("express");
const { newOrder, uploadStatusFile, getcsvfile } = require("../controllers/orderController");
const router = express.Router();

router.route("/createorders").get(newOrder);
router.route("/uploadStatusfile").post(uploadStatusFile);
router.route("/getcsvfile").get(getcsvfile);

module.exports = router;
