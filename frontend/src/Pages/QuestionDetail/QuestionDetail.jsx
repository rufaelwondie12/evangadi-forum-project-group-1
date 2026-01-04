import React from "react";
import { useParams } from "react-router-dom";
import QuestionDetailFeature from "../../features/questions/QuestionDetail/QuestionDetail";
import AnswerList from "../../features/answers/AnswerList/AnswerList";
import AnswerForm from "../../features/answers/AnswerForm/AnswerForm";
import classes from "./QuestionDetail.module.css";

const QuestionDetailPage = () => {
  const { questionId } = useParams();

  return (
    <div className={classes.page_container}>
      {/* 1. Show the Question Logic */}
      <QuestionDetailFeature questionId={questionId} />

      {/* 2. Show the Answers List  */}
      <hr />
      <AnswerList questionId={questionId} />

      {/* 3. Show the Post Answer Form  */}
      <AnswerForm questionId={questionId} />
    </div>
  );
};

export default QuestionDetailPage;
