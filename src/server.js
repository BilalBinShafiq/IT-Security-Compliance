require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

// ✅ Only call `connectDB()` here
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT} in ${process.env.NODE_ENV.toUpperCase()} mode`
  );
});
