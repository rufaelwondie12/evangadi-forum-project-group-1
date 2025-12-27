const express = require("express");
const router = express.Router();

// Import the controller functions
const {
  postQuestion,
  allQuestions,
} = require("../controller/questionController");

// Get all questions
router.get("/all-questions", allQuestions);

// Post a question
router.post("/post-question", postQuestion);

module.exports = router;
