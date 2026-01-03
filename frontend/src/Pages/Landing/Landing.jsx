import React from "react";
import "./Landing.module.css";

const Landing = () => {
  // STUDENT TASK:
  // 1. Create a state called 'isLogin' using useState (default true)
  // 2. Create a function to toggle this state

  return (
    <section className="landing_container">
      <div className="auth_box">
        {/* STUDENT TASK: Conditionally render <Login /> or <Register /> here */}
        <p>Login / Register logic goes here (Student Task)</p>
      </div>

      <div className="landing_about">
        <h1>About Evangadi Networks</h1>
        <p>No matter what stage of life you are in...</p>
        <button className="orange_btn">HOW IT WORKS</button>
      </div>
    </section>
  );
};

export default Landing;
