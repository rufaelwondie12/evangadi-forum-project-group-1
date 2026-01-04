import { useState } from "react";
import axios from "axios";
import "./QuestionForm.css";

const QuestionForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

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

      // reset
      setTitle("");
      setDescription("");
      setTag("");
      setOpen(false);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to post question");
    }
  };

  return (
    <div className="question-form-wrapper">
      <button className="toggle-btn" onClick={() => setOpen(!open)}>
        Ask a Question
        <span className={`arrow ${open ? "open" : ""}`}>⌄</span>
      </button>

      <div className={`form-slide ${open ? "show" : ""}`}>
        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Question title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Describe your question..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Tag (optional)"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />

          <button type="submit" className="submit-btn">
            Post Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
