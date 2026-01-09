import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosBase from "../../services/axiosConfig";
import classes from "./AskQuestion.module.css";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Please fill all fields");

    try {
      await axiosBase.post("/question/postQuestion", {
        title: title,
        description: description,
        tag: "General", // Optional tag logic
      });
      alert("Question posted successfully!");
      navigate("/"); // Redirect back to home to see the new question
    } catch (err) {
      alert("Error posting question. Make sure you are logged in.");
    }
  };

  return (
    <div className={classes.ask_container}>
      <div className={classes.instructions}>
        <h2>Steps to write a good question</h2>
        <ul>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>

      <div className={classes.form_box}>
        <h3>Ask a public question</h3>
        <Link to="/" className={classes.home_link}>
          Go to All Questions Page
        </Link>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Question Description..."
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" className={classes.post_btn}>
            Post Your Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
