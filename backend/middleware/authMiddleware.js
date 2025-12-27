const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  console.log("Middleware: Checking authorization...");
  // For now, it just lets everyone through
  next();
}

module.exports = authMiddleware;
