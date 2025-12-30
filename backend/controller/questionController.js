const dbConnection = require("../config/dbConfig");
const { StatusCodes } = require("http-status-codes");

const crypto = require("crypto");

// Student 1 - Task A
async function postQuestion(req, res) {
  // To generate a unique ID, Student A will use:
  // const questionid = crypto.randomUUID();
  res.send("Post logic coming soon");
}

// Student 2 - Task B
async function getAllQuestions(req, res) {
  res.send("All questions logic coming soon");
}

// Student 3 - Task C
async function getSingleQuestion(req, res) {
  const { questionid } = req.params;

  try {
    // 2. Query the database using a JOIN to get the username of the asker
    const query = `
      SELECT q.questionid, q.title, q.description, q.tag, u.username 
      FROM questions q 
      JOIN users u ON q.userid = u.userid 
      WHERE q.questionid = ?`;

    const [question] = await dbConnection.query(query, [questionid]);

    // 3. If no question is found, return 404
    if (question.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "The requested question could not be found.",
      });
    }

    // 4. Return the result
    return res.status(StatusCodes.OK).json({ question: question[0] });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "An unexpected error occurred.",
    });
  }
}

module.exports = { postQuestion, getAllQuestions, getSingleQuestion };
