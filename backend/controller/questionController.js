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
  res.send("Single question logic coming soon");
}

module.exports = { postQuestion, getAllQuestions, getSingleQuestion };
