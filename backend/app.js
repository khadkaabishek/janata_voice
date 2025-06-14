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
    origin: "http://localhost:5173", // Your React app URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve static files publicly (so uploaded files can be accessed via URL)
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

connectDB();

const authMiddleware = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  next();
};
// Routes
app.use("/submitkyc", kycRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/issue", issueRoute);
app.use("/api/interaction", authMiddleware, interactionRoute);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Janata Voice API is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handler (your own or default)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

app.listen(PORT, () => {
  console.log(`Janata Voice Backend Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
