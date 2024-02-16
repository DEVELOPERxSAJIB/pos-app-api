const mongoose = require("mongoose");

const mongoDBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected successfully`.bgBlue.black.bold);
  } catch (error) {
    console.log(`${error.message}`.bgRed);
  }
};

module.exports = mongoDBConnection;
