const dbConnection = require("../config/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

/* =========================
   REGISTER USER
   ========================= */
async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "All fields are required",
      });
    }

    // Check if user already exists
    const [existingUser] = await dbConnection.query(
      "SELECT userid FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existingUser.length) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    await dbConnection.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    return res.status(StatusCodes.CREATED).json({
      msg: "User registered successfully",
    });

  } catch (error) {
    console.error("Register error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Internal server error",
    });
  }
}

/* =========================
   LOGIN USER
   ========================= */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Email and password are required",
      });
    }

    // Find user
    const [users] = await dbConnection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (!users.length) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: "Invalid credentials",
      });
    }

    const user = users[0];

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: "Invalid credentials",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userid: user.userid,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(StatusCodes.OK).json({
      msg: "Login successful",
      token,
      username: user.username,
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Internal server error",
    });
  }
}

/* =========================
   CHECK AUTHENTICATED USER
   ========================= */
async function checkUser(req, res) {
  const { username, userid } = req.user;

  return res.status(StatusCodes.OK).json({
    msg: "Valid user",
    username,
    userid,
  });
}

module.exports = {
  register,
  login,
  checkUser,
};
