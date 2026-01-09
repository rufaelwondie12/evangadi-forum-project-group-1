import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { getAllQuestions } from "../questionService";
import classes from "./QuestionList.module.css";

// 1. Accept searchTerm as a prop from Home.jsx
const QuestionList = ({ searchTerm }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const data = await getAllQuestions();

        // Extracting the 'data' array from response
        const extractedQuestions = data?.data;

        if (Array.isArray(extractedQuestions)) {
          setQuestions(extractedQuestions);
        } else {
          setQuestions([]);
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // 2. Filter logic: This creates a new list based on the search input
  // We handle the case where searchTerm might be undefined initially
  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes((searchTerm || "").toLowerCase()),
  );

  // 3. Handle Loading State
  if (loading) {
    return <div className={classes.loading}>Loading questions...</div>;
  }

  // 4. Handle Empty State (No questions at all from DB)
  if (questions.length === 0) {
    return (
      <p className={classes.no_data}>
        No questions found. Be the first to ask!
      </p>
    );
  }

  return (
    <div className={classes.question_list}>
      {/* 5. Handle "No Search Results" state */}
      {filteredQuestions.length === 0 ? (
        <p className={classes.no_data}>No questions match your search.</p>
      ) : (
        // 6. Map over filteredQuestions so the UI updates as you type
        filteredQuestions.map((q) => (
          <Link
            key={q.questionid || q.id}
            to={`/question/${q.questionid}`}
            className={classes.question_item}
          >
            <div className={classes.user_info}>
              <div className={classes.avatar}>
                <User size={35} />
              </div>
              <p className={classes.user_name}>{q.username}</p>
            </div>

            <div className={classes.question_content}>
              <p className={classes.question_title}>{q.title}</p>
            </div>

            <div className={classes.arrow}>&gt;</div>
          </Link>
        ))
      )}
    </div>
  );
};

export default QuestionList;
