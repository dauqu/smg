
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mut:7388139606@cluster0.bhwnisi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB connection SUCCESS");
    // require('../data/import');
  } catch (error) {
    console.error("MongoDB connection FAIL");
    // process.exit(1);
  }
};

module.exports = connectDB;
