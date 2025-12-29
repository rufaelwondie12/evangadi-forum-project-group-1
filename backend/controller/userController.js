const dbConnection = require("../config/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

async function register(req, res) {
  // Student 1 will implement registration logic here
  res.send("register logic");
}

async function login(req, res) {
  // Student 2 will implement login logic here
  res.send("login logic");
}

async function checkUser(req, res) {
  // This uses the authMiddleware to verify the user
  const { username, userid } = req.user;
  res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
}

module.exports = { register, login, checkUser };
