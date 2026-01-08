import React from "react";
import classes from "./Answer.css";

const AnswerList = ({ answers }) => {
  return (
    <div className={classes.answer_list_wrapper}>
      <h3>Answers From The Community</h3>
      <hr />
      {/* STUDENT TASK: 
          1. Map through the 'answers' array.
          2. Create a UI for a single answer (User Icon, Username, Answer Text).
          3. Handle the 'empty' state if no answers exist.
      */}
      <p>Answer list logic goes here</p>
    </div>
  );
};

export default AnswerList;
