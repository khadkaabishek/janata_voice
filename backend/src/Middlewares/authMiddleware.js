const jwt = require('jsonwebtoken');
const User = require('../Models/user'); // Make sure path is correct

module.exports.authenticate = async (req, res, next) => {
  try {
    // 1) Get token from headers or cookies
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) { // Changed from jwt to token for consistency
      token = req.cookies.token;
      console.log('Token found in cookies:', token);
    }

    // 2) Verify token exists
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'You are not logged in! Please log in to get access.'
      });
    }

    // 3) Verify token validity
console.log('Token from header:', req.headers.authorization);
console.log('Token from cookies:', req.cookies?.token);
console.log('Using JWT_SECRET:', process.env.JWT_SECRET);

const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log('Decoded token:', decoded);

    // 4) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'error',
        message: 'The user belonging to this token no longer exists.'
      });
    }
    

    // 5) Grant access
    req.user = currentUser;
    next();
  } catch (err) {
    // Improved error handling
    let message = 'Invalid token! Please log in again.';
    if (err.name === 'TokenExpiredError') {
      message = 'Your token has expired! Please log in again.';
    } else if (err.name === 'JsonWebTokenError') {
      message = 'Invalid token! Please log in again.';
    }

    return res.status(401).json({
      status: 'error',
      message
    });
  }
};