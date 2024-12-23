const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

const protect = asyncHandler(async (req, res, next) => {
  //console.log("Middleware protect: Entrée"); // Log de début
  try {
    // check if user is logged in
    const token = req.cookies.token;
    //console.log("tok", token);

    if (!token) {
      // 401 Unauthorized
      res.status(401).json({ message: "Not authorized, please login!" });
    }

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("decodedtok", decoded);

    // get user details from the token ----> exclude password
    const user = await User.findById(decoded.id).select("-password");

    // check if user exists
    if (!user) {
      console.log("user not found");
      res.status(404).json({ message: "User not found!" });
    }

    // set user details in the request object
    req.user = user;

    next();
  } catch (error) {
    // 401 Unauthorized
    res.status(401).json({ message: "Not authorized, token failed!" });
  }
});

module.exports = protect;