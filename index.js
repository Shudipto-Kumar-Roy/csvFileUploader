const express = require("express");
const fileUpload = require("express-fileupload");
const { connectToDB } = require("./database/config");

const app = express();

// environment setup
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// database connection
connectToDB();

// internal import
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");

// middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(fileUpload());

// routes
app.use("/api/v1", productRoute);
app.use("/api/v1", orderRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
