import React, { useEffect, useState } from "react";
import axiosBase from "../../../services/axiosConfig";
import { Link } from "react-router-dom";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Eyerus:
    // 1. Create an async function to fetch all questions
    // 2. Use axiosBase.get("/question/getAllQuestions")
    // 3. Update the 'questions' state with the response
  }, []);

  return (
    <section>
      {/* Eyerus: 
          1. Map through the questions array
          2. Use <Link to={`/question/${q.questionid}`}> for each card
      */}
    </section>
  );
};

export default QuestionList;
