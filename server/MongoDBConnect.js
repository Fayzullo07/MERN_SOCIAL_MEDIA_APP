const { MONGO_URL } = require("./config/config");

const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message} `);
    process.exit(1);
  }
};
