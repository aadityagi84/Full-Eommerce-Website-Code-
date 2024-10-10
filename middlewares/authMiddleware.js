const jwt = require("jsonwebtoken");
const users = require("../models/UserModel");
require("dotenv").config();

// Middleware to protect routes and verify JWT from headers or cookies
const requireSignIn = async (req, res, next) => {
  try {
    // Check if token exists in Authorization header or cookies
    const authHeader = req.headers.authorization;
    const token = authHeader
      ? authHeader.split(" ")[1] // Extract token from Bearer header
      : req.cookies.token; // Extract token from cookies

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing from headers or cookies",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request object

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("JWT verification error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token", error });
  }
};

// Middleware to check if user has admin role
const requireIsAdmin = async (req, res, next) => {
  try {
    const user = await users.findById(req.user._id); // Get user info from database

    // Check if user role is admin (assuming role '1' represents admin)
    if (!user || user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access, you are not an admin",
      });
    }

    next(); // User is admin, proceed to the next middleware or route handler
  } catch (error) {
    console.error("Admin access error:", error);
    return res.status(500).json({
      success: false,
      message: "Error in admin access middleware",
      error,
    });
  }
};

module.exports = { requireSignIn, requireIsAdmin };
