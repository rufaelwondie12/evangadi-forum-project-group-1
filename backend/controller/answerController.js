const dbConnection = require("../config/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function postAnswer(req, res) {
  // Student 3 will implement post answer logic here
  const { questionid, answer } = req.body;
  const userid = req.user.userid;

  if (!questionid || !answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all fields" }); //
  }

  try {
    await dbConnection.query(
      "INSERT INTO answers (userid, questionid, answer) VALUES (?, ?, ?)",
      [userid, questionid, answer],
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Answer posted successfully" }); //
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
}

async function getAnswers(req, res) {
  // Student 3 will implement get answers for a specific question logic here
  //to make sure the app doesn't crash when someone calls the GET route,
  return res.status(StatusCodes.OK).json({
    msg: "Answers list coming soon!",
    answers: [],
  });
}

module.exports = { postAnswer, getAnswers };
