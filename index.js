const express = require("express");
const fileUpload = require("express-fileupload");
const connectToDB = require("../csvUploadWithParse/database/config");
const app = express();

// environment setup
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// database connection
connectToDB();

// internal import
const userRoute = require("./routes/userRoute");

// middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(fileUpload());

// routes
app.use("/api/v1", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
