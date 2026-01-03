const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { postAnswer, getAnswers } = require("../controller/answerController");

// All answer routes are protected
router.post("/postAnswer", authMiddleware, postAnswer);

router.get("/getAnswers/:question_id", authMiddleware, getAnswers);

module.exports = router;
