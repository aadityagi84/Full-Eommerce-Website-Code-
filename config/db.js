const mongoose = require("mongoose");
require("dotenv").config();
const color = require("colors");

const connectDB = async () => {
  try {
    // Corrected the environment variable name
    const connection = await mongoose.connect(process.env.DATABASE_URL);
    console.log(
      `Database connected successfully: ${connection.connection.host}`.bgMagenta
        .white
    );
    return connection;
  } catch (err) {
    console.log(`Error in MongoDB connection: ${err.message}`.bgRed.white);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;
