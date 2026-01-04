import { useState } from "react";
import axios from "axios";
import styles from "./QuestionForm.module.css";

const QuestionForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !description) {
      setError("Title and description are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to post a question");
        return;
      }

      await axios.post(
        "http://localhost:5500/api/question/postQuestion",
        { title, description, tag },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // reset form
      setTitle("");
      setDescription("");
      setTag("");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to post question");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.forumTitle}>Evangadi Forum - Post a Question</h2>

      {error && <p className={styles.errorText}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />

        <textarea
          placeholder="Describe your question..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        />

        <input
          type="text"
          placeholder="Tag (optional)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className={styles.input}
        />

        <button type="submit" className={styles.submitBtn}>
          Post Question
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
