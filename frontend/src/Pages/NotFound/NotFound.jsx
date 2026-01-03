import React from "react";
import { Link } from "react-router-dom";
import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={classes.not_found_container}>
      {" "}
      {/* Fixed class name syntax */}
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        {/* Use the orange_btn class you created in index.css */}
        <button className="orange_btn">Back to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
