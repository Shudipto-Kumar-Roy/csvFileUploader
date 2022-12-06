const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  "Backorders allowed": String,
  Categories: String,
  ID: String,
  Images: String,
  "In stock": Boolean,
  "Is featured": String,
  Name: String,
  Published: String,
  "Regular price": Number,
  SKU: String,
  "Sold individually": String,
  Stock: Number,
  Type: String,
  "Visibility in catalog": String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
