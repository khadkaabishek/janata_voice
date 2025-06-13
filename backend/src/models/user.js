const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxLength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters long"],
      select: false, // Don't include password in queries by default
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      maxLength: [500, "Address cannot exceed 500 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      select: false,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpire: {
      type: Date,
      select: false,
    },
    agreeTerms: {
      type: Boolean,
      // required: [true, "You must agree to terms and conditions"],
      validate: {
        validator: function (v) {
          return v === true;
        },
        message: "You must agree to terms and conditions",
      },
    },
    lastLogin: {
      type: Date,
    },
    profileImage: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("profile").get(function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    address: this.address,
    role: this.role,
    isVerified: this.isVerified,
    profileImage: this.profileImage,
    createdAt: this.createdAt,
  };
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  // Only hash password if it's modified or new
  if (!this.isModified("password")) return next();

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error("Password comparison error:", error); // Log the error
    return false; // Or throw a more specific error, depending on your needs
  }
};

// Instance method to generate password reset token
userSchema.methods.generateResetToken = function () {
  const crypto = require("crypto");

  // Generate token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire time (10 minutes)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Instance method to generate verification token
userSchema.methods.generateVerificationToken = function () {
  const crypto = require("crypto");

  const verificationToken = crypto.randomBytes(32).toString("hex");

  this.verificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  return verificationToken;
};

// Static method to find user by email
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Update lastLogin on successful login
userSchema.methods.updateLastLogin = function () {
  this.lastLogin = new Date();
  return this.save({ validateBeforeSave: false });
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
