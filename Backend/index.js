// index.js or server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); // Your MongoDB connection function

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Configure CORS
app.use(
  cors({
    origin: "https://letsblog-hq27.onrender.com", 
    credentials: true,
  })
);

// ✅ Parse request bodies
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// ✅ Import Routes
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

// ✅ Setup API Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// ✅ Test Route
app.get("/", (_req, res) => {
  res.send("Blogs API is running...");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
