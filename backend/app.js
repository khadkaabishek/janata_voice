const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const connectDB = require("./src/Utils/database");
const authRoutes = require("./src/Routes/authRoutes");
const userRoutes = require("./src/Routes/userRoutes");
const issueRoute = require("./src/Routes/issueRoute.js");
const interactionRoute = require("./src/Routes/interactionRoute.js");
const { errorHandler } = require("./src/Middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Your React app URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// app.options("*", cors());

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

const authMiddleware = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  next();
};
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/issue",authMiddleware, issueRoute);
app.use("/api/interaction",authMiddleware, interactionRoute);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Janata Voice API is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
// app.use("*", (req, res) => {
//   res.status(404).json({
//     status: "error",
//     message: "Route not found",
//   });
// });

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Janata Voice Backend Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
