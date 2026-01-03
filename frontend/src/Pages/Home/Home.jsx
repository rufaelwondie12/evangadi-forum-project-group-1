import React from "react";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <div className={classes.home - container}>
      {/* STUDENT TASK: 
          - Fetch all questions from the backend.
          - Map through them and link each to /question/:id.
      */}
      <h1>Welcome to the Forum</h1>
      <p>List of questions goes here</p>
    </div>
  );
};
export default Home;
