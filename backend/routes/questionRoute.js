const express = require("express");
const router = express.Router();

// Import the auth middleware to protect these routes
const authMiddleware = require("../middleware/authMiddleware");

// Import the controller functions
const {
  postQuestion,
  getAllQuestions,
  getSingleQuestion,
} = require("../controller/questionController");

// 1. Post a question - [POST] /api/question/
router.post("/postQuestion", authMiddleware, postQuestion);

// 2. Get all questions - [GET] /api/question/ method to fetch all questions only for authenticated users

router.get("/getAllQuestions", authMiddleware, getAllQuestions);

// 3. Get a single question - [GET] /api/question/:question_id
router.get(
  "/getSingleQuestion/:question_id",
  authMiddleware,
  getSingleQuestion,
);

module.exports = router;
