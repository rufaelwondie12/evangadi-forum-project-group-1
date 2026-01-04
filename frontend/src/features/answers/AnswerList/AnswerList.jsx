import React, { useEffect, useState } from "react";
import axiosBase from "../../../services/axiosConfig";
import classes from "./AnswerList.module.css";

const AnswerList = ({ questionId }) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    //
    // 1. Fetch answers using axiosBase.get(`/answer/getAnswers/${questionId}`)
    // 2. Set the state with the returned array
  }, [questionId]);

  return (
    <div className={classes.answers_container}>
      <h3>Answers From The Community</h3>
      <hr />
      {/*  Map through the 'answers' array and show user + answer text */}
    </div>
  );
};

export default AnswerList;
