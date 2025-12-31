const express = require("express");
const router = express.Router();

// Import the auth middleware to protect these routes
const authMiddleware = require("../middleware/authMiddleware");

// Import the controller functions (Student 2 will fill these in)
const {
  postQuestion,
  getAllQuestions,
  getSingleQuestion,
} = require("../controller/questionController");

// 1. Post a question - [POST] /api/question/
router.post("/", authMiddleware, postQuestion);

// 2. Get all questions - [GET] /api/question/ method to fetch all questions only for authenticated users

router.get("/", authMiddleware, getAllQuestions);

//  to test without authentication to get dummy data we insert from our database
// router.get("/getAllQuestions",  getAllQuestions);

// 3. Get a single question - [GET] /api/question/:question_id
router.get("/:question_id", authMiddleware, getSingleQuestion);

module.exports = router;
