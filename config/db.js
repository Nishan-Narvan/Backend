const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        // connect to database MongoDB using mongoose
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("❌ Error in DB connection: ", error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
