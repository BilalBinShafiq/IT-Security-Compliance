require("dotenv").config();
const app = require("./app"); // Import the app instance
const connectDB = require("./config/db"); // Import DB connection

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT} in ${process.env.NODE_ENV.toUpperCase()} mode`
  );
});
