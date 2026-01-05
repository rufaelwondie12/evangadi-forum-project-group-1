import { useState } from "react";
import { askQuestion } from "../questionService";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import styles from "./QuestionForm.module.css";

const QuestionForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !description) {
      setError("Title and description are required");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to post a question");
        setLoading(false);
        return;
      }

      const response = await askQuestion(title, description, tag);

      setLoading(false);
      setSuccess("✅ Your question was posted successfully!");

      // reset form
      setTitle("");
      setDescription("");
      setTag("");

      // Navigate after 1.5s
      setTimeout(() => {
        navigate("/"); // redirect to getAllQuestions
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.msg || "Failed to post question");
    }
  };

  return (
    <div className={styles.wrapper}>
      {loading && <Loader />}

      {/* Steps Section */}
      <div className={styles.stepsContainer}>
        <h2 className={styles.stepsTitle}>Steps to write a good question</h2>
        <ul className={styles.stepsList}>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>

      {/* Form Section */}
      <h3 className={styles.formTitle}>Ask Public Question</h3>

      <div className={styles.goToPage}>
        <Link to="/" className={styles.link}>
          Go to Question Page
        </Link>
      </div>

      {/* Notifications */}
      {error && <p className={styles.errorText}>{error}</p>}
      {success && <p className={styles.successNotification}>{success}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />

        <textarea
          placeholder="Describe your problem..."
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
          Post Your Question
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
