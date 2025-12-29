// This protects routes so only logged-in users can post questions or answers.

const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken"); //This is the library used to verify the "Identity Card" (token) that the user sends with their request.

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid " });
  }

  const token = authHeader.split(" ")[1];
  try {
    const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { username, userid };
    next(); //tells Express to move to the next piece of code
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }
}

module.exports = authMiddleware;
