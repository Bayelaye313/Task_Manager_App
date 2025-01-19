const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

const protect = asyncHandler(async (req, res, next) => {
  try {
    // Check if user is logged in
    const token = req.cookies.token;

    if (!token) {
      // 401 Unauthorized
      return res.status(401).json({ message: "Not authorized, please login!" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user details from the token and exclude password
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      // 404 Not Found
      return res.status(404).json({ message: "User not found!" });
    }

    // Set user details in the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification failure or other errors
    return res.status(401).json({ message: "Not authorized, token failed!" });
  }
});
const adminMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role == "admin") {
    return next();
  }
  return res
    .status(403)
    .json({ message: "only admins can access to this feature" });
});
const creatorMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user && (req.user.role === "creator" || req.user.role === "admin")) {
    return next();
  }

  return res.status(403).json({
    message: "Only admins and creators can access this feature",
  });
});

module.exports = { protect, adminMiddleware, creatorMiddleware };
