import React from "react";
import { Link } from "react-router-dom";
import QuestionList from "../../features/questions/QuestionList/QuestionList";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <div className={classes.home_container}>
      <div className={classes.header_row}>
        <Link to="/ask">
          <button className="blue_btn">Ask Question</button>
        </Link>
        <h2>here is main page after login</h2>
        {/* Welcome message */}
        <h2 className={classes.welcome_text}>Welcome to the Forum</h2>
      </div>

      {/* Eyerus: The actual list logic lives inside this component */}
      <QuestionList />
    </div>
  );
};

export default Home;
