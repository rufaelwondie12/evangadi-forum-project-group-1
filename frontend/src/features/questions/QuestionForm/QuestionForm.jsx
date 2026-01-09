import React, { useState } from "react";
import axiosBase from "../../../services/axiosConfig";
import { useNavigate } from "react-router-dom";

const QuestionForm = () => {
  const navigate = useNavigate();

  // Student Task: Add state for 'title' and 'description' here

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Student Task:
    // 1. Logic to call axiosBase.post("/question/postQuestion", { title, description })
    // 2. On success, use navigate("/") to go back to the home page
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Student Task: Create inputs for Title and Description */}
      <button type="submit" className="blue_btn">
        Post Your Question
      </button>
    </form>
  );
};

export default QuestionForm;
