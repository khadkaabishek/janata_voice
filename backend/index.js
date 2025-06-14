const express = require("express");

const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");



const authRoutes = require("./src/Routes/authRoutes");
const userRoutes = require("./src/Routes/userRoutes");
const { errorHandler } = require("./src/Middlewares/errorHandler");
const express = require("express");
const cors = require("cors");
const issueRoute = require("./src/Routes/issueRoute.js");
const interactionRoute = require("./src/Routes/interactionRoute.js");
const { connectDB } = require("./connection.js");
require("dotenv").config();

const app = express();
const PORT = 3000;

// DB Connection
connectDB(`${process.env.Mongo_URL}`)
  .then(() => {
    console.log(`Db Connected`);
  })
  .catch((err) => {
    console.log(`Error : ${err}`);
  });

// Middlewares
app.use(cors());
app.use(express.json()); 


// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Logging
app.use(morgan("combined"));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/issue", issueRoute);
app.use("/interaction", interactionRoute);

// Security middleware
app.use(helmet());

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


// Server
app.listen(PORT, () => {
  console.log(`Server Started : ${PORT}`);
});
