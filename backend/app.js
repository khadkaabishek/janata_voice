const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./src/Routes/authRoutes");
const userRoutes = require("./src/Routes/userRoutes");
const issueRoute = require("./src/Routes/issueRoute.js");
const interactionRoute = require("./src/Routes/interactionRoute.js");
const connectDB = require("./src/Utils/database");
const kycRoutes = require("./src/Routes/kycRoutes");
const { protect1, restrictTo } = require("./src/Middlewares/authMiddle.js"); // ✅ Fix here

const app = express();
const PORT = process.env.PORT || 5001;

// Ensure public/uploads folder exists
const uploadDir = path.join(__dirname, "public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

connectDB();

// Routes
app.use("/submitkyc", kycRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/issue", protect1, issueRoute);              // ✅ Protected
app.use("/api/interaction", protect1, interactionRoute);  // ✅ Protected

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Janata Voice API is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

app.listen(PORT, () => {
  console.log(`Janata Voice Backend Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
