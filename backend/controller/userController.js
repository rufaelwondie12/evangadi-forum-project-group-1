const dbConnection = require("../db/dbconfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;

  if (!username || !firstname || !lastname || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please provide all required fields",
    });
  }

  try {
    // Check if user already exists
    const [user] = await dbConnection.query(
      "SELECT username, userid FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already registered" });
    }

    // Validate password length
    if (password.length <= 8) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 8 characters" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    await dbConnection.query(
      `INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)`,
      [username, firstname, lastname, email, hashedPassword]
    );

    return res.status(StatusCodes.CREATED).json({ msg: "User registered" });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
}
async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please provide all required fields",
    });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT username, userid, password FROM users WHERE email = ? ",
      [email]
    );
    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid credential" });
    }

    // compared password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid credential" });
    }
    const username = user[0].username;
    const userid = user[0].userid;

    const token = jwt.sign({ username, userid }, "secret", { expiresIn: "1d" });

    return res
      .status(StatusCodes.OK)
      .json({ msg: "user login successful", token });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
}

async function checkUser(req, res) {
  res.send("check user");
}
module.exports = { register, login, checkUser };



