const jwt = require("jsonwebtoken");

function generateTokens(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

module.exports = generateTokens;
