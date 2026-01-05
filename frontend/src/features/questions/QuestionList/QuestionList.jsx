import React, { useEffect, useState } from "react";
import { getAllQuestions } from "../questionService";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import classes from "./QuestionList.module.css";
import { PulseLoader } from "react-spinners";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await getAllQuestions();
        console.log("Full response from backend:", response); // <- debug

        if (response && !response.error && Array.isArray(response.data)) {
          setQuestions(response.data);
        } else {
          console.error("Error fetching questions:", response?.message);
          setQuestions([]);
        }
      } catch (err) {
        console.error("Failed to fetch questions:", err);
        setQuestions([]);
      } finally {
        setLoading(false); // stop loader
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div className={classes.loaderContainer}>
        <PulseLoader color="#3b82f6" size={15} />
        <p>Loading questions...</p>
      </div>
    );
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    return <p className={classes.noQuestions}>No questions found.</p>;
  }

  return (
    <div className={classes.container}>
      {questions.map((q) => (
        <div key={q.questionid} className={classes.card}>
          {/* Top row: Author info + title + arrow */}
          <div
            className={classes.cardHeader}
            onClick={() =>
              setExpanded(expanded === q.questionid ? null : q.questionid)
            }
          >
            <div className={classes.authorInfo}>
              <div className={classes.avatar}>
                {q.username?.[0].toUpperCase() || "U"}
              </div>
              <span className={classes.authorName}>{q.username}</span>
            </div>

            <h3 className={classes.cardTitle}>{q.title}</h3>
            {expanded === q.questionid ? (
              <FaChevronUp className={classes.arrow} />
            ) : (
              <FaChevronDown className={classes.arrow} />
            )}
          </div>

          {/* description */}
          <div
            className={`${classes.cardDescription} ${
              expanded === q.questionid ? classes.maxOpen : classes.maxClose
            }`}
          >
            <p>{q.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
