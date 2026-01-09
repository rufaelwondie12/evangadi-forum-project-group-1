import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ArrowUp, Search } from "lucide-react";
import QuestionList from "../../features/questions/QuestionList/QuestionList";
import classes from "./Home.module.css";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Function to scroll smoothly to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={classes.home_container}>
      <div className={classes.header_row}>
        <button onClick={() => navigate("/ask")} className={classes.askButton}>
          Ask Question
        </button>
        <h2 className={classes.welcome}>
          <span className={classes.wave_emoji}>👋</span> {""}
          Welcome:
          <span className={classes.username}>
            <strong>{user?.username}</strong>
          </span>
        </h2>
      </div>

      <div className={classes.search_section}>
        <Search className={classes.search_icon} size={20} />
        <input
          type="text"
          placeholder="Search questions..."
          className={classes.search_bar}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            style={{
              position: "absolute",
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "none",
              cursor: "pointer",
              color: "#999",
            }}
          >
            ✕
          </button>
        )}
      </div>

      <div className={classes.question_list_wrapper}>
        <h3>Questions</h3>
        <hr />
        <QuestionList searchTerm={searchTerm} />
      </div>

      {/* 1. Add the Scroll to Top Button at the end */}
      <div className={classes.scroll_top_container}>
        <button onClick={scrollToTop} className={classes.scrollTopButton}>
          <ArrowUp size={20} />
          Back to Top
        </button>
      </div>
    </div>
  );
};

export default Home;
