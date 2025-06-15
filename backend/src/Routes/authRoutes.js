const express = require("express");
const {
  register,
  login,
  logout,
  getMe,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../Controllers/authController");

const { protect } = require("../Middlewares/auth");
const {
  validateLogin,
  validateForgotPassword,
  validatePasswordReset,
  handleValidationErrors,
} = require("../Middlewares/validation");
const { validateRegister } = require("../Middlewares/validation");

const router = express.Router();

// Public routes
router.post("/register", validateRegister,handleValidationErrors, register);

router.post("/login", validateLogin, handleValidationErrors, login);
router.post(
  "/forgot-password",
  validateForgotPassword,
  handleValidationErrors,
  forgotPassword
);
router.put(
  "/reset-password/:resettoken",
  validatePasswordReset,
  handleValidationErrors,
  resetPassword
);
router.get("/verify/:token", verifyEmail);

// Protected routes
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

module.exports = router;
