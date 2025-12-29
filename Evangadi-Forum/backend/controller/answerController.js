const dbConnection = require("../config/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function postAnswer(req, res) {
  // Student 3 will implement post answer logic here
  res.send("post answer");
}

async function getAnswers(req, res) {
  // Student 3 will implement get answers for a specific question logic here
  res.send("get answers");
}

module.exports = { postAnswer, getAnswers };
