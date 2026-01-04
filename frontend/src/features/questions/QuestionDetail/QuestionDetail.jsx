import React, { useEffect, useState } from "react";
import axiosBase from "../../../services/axiosConfig";

const QuestionDetail = ({ questionId }) => {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    // Birhanu Task:
    // 1. Create an async function
    // 2. Fetch using axiosBase.get(`/question/getSingleQuestion/${questionId}`)
    // 3. Handle loading and error states
  }, [questionId]);

  return (
    <div>
      {/* Birhanu UI: Display the Title and Description of the question */}
      <h2>QUESTION</h2>
      <h3>{question?.title}</h3>
      <p>{question?.description}</p>
    </div>
  );
};

export default QuestionDetail;
