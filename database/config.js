const mongoose = require("mongoose");

exports.connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`Database connected with the ${conn.connection.host}`);
  } catch (error) {
    console.log(`Database connection failed`);
  }
};
