const db = require('../config/dbConfig');

// POST answer (Protected)
exports.postAnswer = async (req, res) => {
  try {
    const { answer, questionid } = req.body;
    const userid = req.user.userid; // from JWT middleware

    if (!answer || !questionid) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    await db.query(
      'INSERT INTO answers (answer, questionid, userid) VALUES (?, ?, ?)',
      [answer, questionid, userid],
    );

    res.status(201).json({ message: 'Answer posted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET answers by question
exports.getAnswers = async (req, res) => {
  try {
    const { question_id } = req.params;

    const [answers] = await db.query(
      `SELECT a.answer, a.created_at, u.username
       FROM answers a
       JOIN users u ON a.userid = u.userid
       WHERE a.questionid = ?
       ORDER BY a.created_at ASC`,
      [question_id],
    );

    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
