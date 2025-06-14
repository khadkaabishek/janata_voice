import jwt from "jsonwebtoken";
import User from "../Models/user.js"; // Assuming you have a User model to fetch user details

export const protect1 = async (req, res, next) => {
  let token;
  console.log("i am here-1");

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ status: "fail", message: "You are not logged in!" });
  }

  try {
    const decoded = jwt.verify(token, "abueburb#245");

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "The user belonging to this token does no longer exist.",
      });
    }

    req.user = currentUser;

    next();
  } catch (err) {
    return res.status(401).json({ status: "fail", message: "Invalid token!" });
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };
};
