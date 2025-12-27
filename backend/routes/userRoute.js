const express = require("express");
const router = express.Router();

// Import the functions from the controller
const { register, login } = require("../controller/userController");

// Define the endpoints
router.post("/register", register);
router.post("/login", login);

module.exports = router;
