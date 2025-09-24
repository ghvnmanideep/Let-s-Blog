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
app.use(cors({
  origin: 'https://let-s-blog-kappa.vercel.app', // your deployed frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // allow methods your API supports
  allowedHeaders: ['Content-Type', 'Authorization'],   // allowed headers in requests
  preflightContinue: false,  // stops after OPTIONS check
}));
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
