const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const controller = require('../controllers/answerController');

// Post answer (JWT required)
router.post('/', auth, controller.postAnswer);

// Get answers for a question
router.get('/:question_id', controller.getAnswers);

module.exports = router;
