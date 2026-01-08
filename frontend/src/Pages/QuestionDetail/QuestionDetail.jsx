import React from "react";
import QuestionHeaderUI from "../../features/questions/QuestionDetail/QuestionHeaderUI";
import QuestionDetail from "../../features/questions/QuestionDetail/QuestionDetail";
import classes from "./QuestionDetail.module.css";

const QuestionDetailPage = () => {
  return (
    <>
      <main className={classes.page_container}>
        {/* <QuestionHeaderUI /> */}
        {/* Calling the Feature logic */}
        <QuestionDetail />
      </main>
    </>
  );
};

export default QuestionDetailPage;
