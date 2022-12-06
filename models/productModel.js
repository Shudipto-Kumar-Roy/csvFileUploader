const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  Type: {
    type: String,
  },
  Name: {
    type: String,
  },
  photo: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
  __v: false,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
