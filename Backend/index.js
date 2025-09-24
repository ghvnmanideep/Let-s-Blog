// index.js or server.js (main entry point)
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); // Assuming your DB connection in Config/db.js

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Configure CORS to allow your frontend origin
app.use(
  cors({
    origin: "https://lelsblog.netlify.app/", // adjust to your frontend URL/port/environment
    credentials: true,
  })
);

// Parse JSON and urlencoded payloads with large limits
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Import Routers
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

// Setup API routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs",blogRoutes);

// Simple test route
app.get("/", (_req, res) => {
  res.send("Blogs API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
