import React from "react";
import QuestionForm from "../../features/questions/QuestionForm/QuestionForm";
import styles from "./AskQuestion.module.css";

const AskQuestion = () => {
  return (
    <div className="content-container">
      <div className={styles.instructions}>
        <h2>Steps to write a good question</h2>
        <ul>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Explain what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>

      {/* The Feature component containing the logic */}
      <QuestionForm />
    </div>
  );
};

export default AskQuestion;
