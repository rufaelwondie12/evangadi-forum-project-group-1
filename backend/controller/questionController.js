const dbConnection = require("../config/dbConfig");
const { StatusCodes } = require("http-status-codes");

const crypto = require("crypto");

// Student 1 - Task A
async function postQuestion(req, res) {
  try {
    const { title, description, userid, tag } = req.body;

    if (!title || !description || !userid) {
      return res
        .status(400)
        .json({ msg: "Title, description, and userid are required" });
    }

    // Check if user exists
    const [user] = await dbConnection.execute(
      "SELECT userid FROM users WHERE userid = ?",
      [userid]
    );
    if (!user.length) {
      return res.status(400).json({ msg: "User does not exist" });
    }

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

    res.status(201).json({ msg: "Question posted successfully", questionid });
  } catch (error) {
    console.error("Error posting question:", error.message);
    res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
}


// Student 2 - Task B
async function getAllQuestions(req, res) {
  res.send("All questions logic coming soon");
}

// Student 3 - Task C
async function getSingleQuestion(req, res) {
  res.send("Single question logic coming soon");
}

module.exports = { postQuestion, getAllQuestions, getSingleQuestion };
