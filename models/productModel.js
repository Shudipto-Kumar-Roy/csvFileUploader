const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  ID: {
    type: Number,
  },
  Type: {
    type: String,
  },
  SKU: {
    type: String,
  },
  Name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
