const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`Database connected with ${conn.connection.host}`);
  } catch (error) {
    console.log(`Database connection failed ${error}`);
  }
};

module.exports = connectToDB;
