const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { postAnswer, getAnswers } = require("../controller/answerController");

// All answer routes are protected
router.route("/").post(authMiddleware, postAnswer); //to handle multiple HTTP methods on the same path.

router.route("/:question_id").get(authMiddleware, getAnswers);

module.exports = router;
