console.log("6️⃣ Loading db.js...");

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("8️⃣ Attempting MongoDB connection...");
    const env = process.env.NODE_ENV || "development";

    // Database Credentials Based on Environment
    const DB_HOST =
      env === "production" ? process.env.DB_HOST_PROD : process.env.DB_HOST_DEV;
    const DB_USER =
      env === "production" ? process.env.DB_USER_PROD : process.env.DB_USER_DEV;
    const DB_PASS =
      env === "production" ? process.env.DB_PASS_PROD : process.env.DB_PASS_DEV;
    const DB_NAME =
      env === "production" ? process.env.DB_NAME_PROD : process.env.DB_NAME_DEV;

    // Construct MongoDB URI
    const mongoURI =
      env === "production"
        ? `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}?retryWrites=true&w=majority&appName=${DB_NAME}`
        : `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}?retryWrites=true&w=majority&appName=${DB_NAME}`;

    // Connect to MongoDB
    await mongoose.connect(mongoURI);

    console.log(`✅ 9️⃣ MongoDB Connected to ${env.toUpperCase()} Database`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
