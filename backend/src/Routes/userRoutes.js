const express = require("express");
const {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  getUsers,
  getUser,
  updateUser,
} = require("../Controllers/userController");
const { protect1 } = require("./../Middlewares/authMiddle");
const { protect, authorize } = require("../Middlewares/auth");
const {
  validateProfileUpdate,
  validatePasswordChange,
  handleValidationErrors,
} = require("../Middlewares/validation");
const loggRoute = require("./logRoute");
const router = express.Router();

// All routes are protected
router.use(protect1);

// User profile routes
router.get("/profile", getProfile);
router.put(
  "/profile",
  validateProfileUpdate,
  handleValidationErrors,
  updateProfile
);
router.put(
  "/change-password",
  validatePasswordChange,
  handleValidationErrors,
  changePassword
);
router.delete("/account", deleteAccount);
router.get("/islogg", loggRoute);

router.get("/", authorize("admin"), getUsers);
router.get("/:id", authorize("admin"), getUser);
router.put("/:id", authorize("admin"), updateUser);

module.exports = router;
