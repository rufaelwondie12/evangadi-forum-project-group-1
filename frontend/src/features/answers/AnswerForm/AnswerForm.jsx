import React, { useState } from "react";
import axiosBase from "../../../services/axiosConfig";
import classes from "./AnswerForm.module.css";

const AnswerForm = ({ questionId }) => {
  // 1. Add state for the 'answer' text

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 2. Logic to call axiosBase.post("/answer/postAnswer", {
    //    questionid: questionId,
    //    answer: "..."
    // })
    // 3. Tip: On success, you might want to refresh the page or clear the input
  };

  return (
    <div className={classes.answer_form_container}>
      <form onSubmit={handleSubmit}>
        {/*  Create the textarea and submit button here */}
        <button type="submit" className="blue_btn">
          Post Your Answer
        </button>
      </form>
    </div>
  );
};

export default AnswerForm;
