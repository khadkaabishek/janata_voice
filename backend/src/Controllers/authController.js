const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const User = require("../Models/user");
const { sendEmail } = require("../Utils/sendEmail");

// Generate JWT Token
const generateToken = (id, isLoggedIn) => {
  return jwt.sign(
    { id, isLoggedIn: true },
    process.env.JWT_SECRET || "abueburb#245",
    {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    }
  );
};

// Send token response
const sendTokenResponse = (user, statusCode, res, message = "Success") => {
  const isLoggedIn = false;
  const token = generateToken(user._id, isLoggedIn);
  // console.log(token)
  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    path: "/",
    secure: false,
    // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  return res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      status: "success",
      message,
      data: {
        token,
        user: user.profile,
      },
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { name, email, password, address, agreeTerms } = req.body;
    console.log(req.body);
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "User already exists with this email address",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      address,
      agreeTerms,
    });

    await user.save({ validateBeforeSave: false });

    // ✅ Automatically log in the user after registration
    sendTokenResponse(user, 201, res, "User registered successfully");
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      status: "error",
      message: "Registration failed. Please try again.",
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findByEmail(email).select("+password");
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        status: "error",
        message: "Account has been deactivated",
      });
    }

    await user.updateLastLogin();
    sendTokenResponse(user, 200, res, "Login successful");
    // console.log("Token My",generatedToken);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      status: "error",
      message: "Login failed. Please try again.",
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      status: "success",
      data: {
        user: user.profile,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to get user information",
    });
  }
};

// @desc    Verify email
// @route   GET /api/auth/verify/:token
// @access  Public
exports.verifyEmail = async (req, res) => {
  try {
    const verificationToken = crypto
      .createHash("sha256")
      .update(decodeURIComponent(req.params.token))
      .digest("hex");

    const user = await User.findOne({
      verificationToken,
      isVerified: false,
    });

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or expired verification token",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Email verified successfully. You can now login.",
    });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({
      status: "error",
      message: "Email verification failed",
    });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "No user found with this email address",
      });
    }

    const resetToken = user.generateResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/reset-password/${encodeURIComponent(resetToken)}`;
    const emailText = `Password reset link: ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset Request",
        text: emailText,
      });

      res.status(200).json({
        status: "success",
        message: "Password reset email sent",
      });
    } catch (emailError) {
      console.error("Email failed:", emailError);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      res.status(500).json({
        status: "error",
        message: "Email could not be sent",
      });
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      status: "error",
      message: "Password reset request failed",
    });
  }
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resettoken
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(decodeURIComponent(req.params.resettoken))
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or expired reset token",
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res, "Password reset successful");
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      status: "error",
      message: "Password reset failed",
    });
  }
};
