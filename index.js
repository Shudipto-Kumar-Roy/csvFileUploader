const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const PORT = process.env.PORT || 4000;

// internal import
const userRoute = require("./routes/userRoute");

// middlewares
app.use(express.json());
app.use(fileUpload());

// routes
app.use("/api/v1",userRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})