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
  res.send("All questions logic coming soon");
}

// Student 3 - Task C (Ready for implementation)
async function getSingleQuestion(req, res) {
  res.send("Single question logic coming soon");
}

module.exports = { postQuestion, getAllQuestions, getSingleQuestion };
