// db connection
// const e = require ("express")
const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;

  if (!email || !password || !firstname || !lastname || !username) {
    return res.status(400).json({ msg: "Please provide all required fields" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const sql =
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)";

    await dbConnection.query(sql, [
      username,
      firstname,
      lastname,
      email,
      hashedPassword,
    ]);

    return res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  //  Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide email and password" });
  }

  try {
    // Find the user by email
    const [rows] = await dbConnection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const user = rows[0];

    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    //  Login successful
    return res.status(200).json({
      msg: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
}

async function checkUser(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: "Please provide an email" });
  }

  try {
    // Query the database to find the user by email
    const [rows] = await dbConnection.query(
      "SELECT id, username, firstname, lastname, email FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    // User exists
    const user = rows[0];
    return res.status(200).json({ msg: "User exists", user });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
}

module.exports = { register, login, checkUser };
