import React from "react";
import { useNavigate } from "react-router-dom";
import QuestionList from "../../features/questions/QuestionList/QuestionList";
import classes from "./Home.module.css";

const Home = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate(); // <-- initialize navigate

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    navigate("/ask"); // <-- navigate to /ask page
    // You can route to ask question page or show a modal
    // alert("Redirect to Ask Question page");
  };

  return (
    <div className={classes.homeWrapper}>
      {/* Top Bar */}
      <div className={classes.topBar}>
        <button onClick={handleAskQuestion} className={classes.askButton}>
          Ask Question
        </button>
        <span className={classes.welcomeText}>Welcome, {username}</span>
      </div>

      {/* Questions Heading */}
      <div className={classes.questionsHeading}>
        <h2>Questions</h2>
        <hr />
      </div>

      {/* Main Content */}
      <div className={classes.mainContent}>
        {/* Question List */}
        <div className={classes.questionContainer}>
          <QuestionList />
        </div>
      </div>
    </div>
  );
};

export default Home;
