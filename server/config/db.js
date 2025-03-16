// config/db.js
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const mongo_url = process.env.MONGO_URI + process.env.MONGO_DB;
    await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Failed", err);
    process.exit(1);
  }
};
module.exports = connectDB;