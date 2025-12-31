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
  try {
    // SQL query to get all questions with user information
    const query = `
            SELECT 
                q.questionid,
                q.title,
                q.description,
                q.tag,
                q.id,
                q.created_at,
                u.userid,
                u.username,
                u.firstname,
                u.lastname
            FROM questions q
            JOIN users u ON q.userid = u.userid
            ORDER BY q.id DESC
        `;
    //destructure the result to get only the rows
    const [questions] = await dbConnection.execute(query);

    // Check if questions exist
    if (questions.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: true,
        message: "No questions found",
        data: [],
      });
    }

    res.status(StatusCodes.OK).json({
      error: false,
      message: "Questions retrieved successfully",
      data: questions,
      count: questions.length,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: true,
      message: "Internal server error",
      details: error.message,
    });
  }
}

// Student 3 - Task C
async function getSingleQuestion(req, res) {
  res.send("Single question logic coming soon");
}

module.exports = { postQuestion, getAllQuestions, getSingleQuestion };
