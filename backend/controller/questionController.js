const dbConnection = require("../config/dbConfig");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");

// Student 1 - Task A
async function postQuestion(req, res) {
  const { title, description, tag } = req.body;

  // SECURE: Get userid from the token, not from the user's input
  const { userid } = req.user;

  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields (title, description)" });
  }

  try {
    const questionid = uuidv4();

    const query = `
      INSERT INTO questions (questionid, userid, title, description, tag)
      VALUES (?, ?, ?, ?, ?)
    `;

    await dbConnection.execute(query, [
      questionid,
      userid,
      title,
      description,
      tag || null,
    ]);

    return res.status(StatusCodes.CREATED).json({
      msg: "Question posted successfully",
      questionid,
    });
  } catch (error) {
    console.error("Error posting question:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
}

// Student 2 - Task B (Ready for implementation)
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

// Student 3 - Task C (Ready for implementation)
async function getSingleQuestion(req, res) {
  const { question_id } = req.params;

  try {
    // 2. Query the database using a JOIN to get the username of the asker
    const query = `
      SELECT q.questionid, q.title, q.description, q.tag, u.username 
      FROM questions q 
      JOIN users u ON q.userid = u.userid 
      WHERE q.questionid = ?`;

    const [question] = await dbConnection.query(query, [question_id]);

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
