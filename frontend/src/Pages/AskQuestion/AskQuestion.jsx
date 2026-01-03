import React from "react";

import classes from "./AskQuestion.module.css";

const AskQuestion = () => {
  return (
    <div className={classes.ask_container}>
      <h2 className={classes.title}>Ask a public question</h2>

      <form className={classes.form}>{/* Students build the rest here */}</form>
    </div>
  );
};

export default AskQuestion;
