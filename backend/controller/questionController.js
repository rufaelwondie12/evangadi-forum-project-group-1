const dbConnection = require("../config/dbConfig");

// Function to post a new question
async function postQuestion(req, res) {
  // This is where the team will extract title and description from req.body
  res
    .status(200)
    .json({ msg: "Post Question logic will be written here by the team." });
}

// Function to get all questions from the database
async function allQuestions(req, res) {
  try {
    // Example logic for the team to expand on:
    // const [questions] = await dbConnection.query("SELECT * FROM questions");
    res.status(200).json({ msg: "All Questions logic will be written here." });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong, try again later." });
  }
}

module.exports = { postQuestion, allQuestions };
