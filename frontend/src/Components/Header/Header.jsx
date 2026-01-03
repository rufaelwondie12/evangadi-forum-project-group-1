import React from "react";
import evangadiLogo from "../../assets/images/header-logo.png";
import "./Header.module.css";

const Header = () => {
  // STUDENT TASK:
  // 1. Get the 'user' and 'logout' function from your AuthContext
  // 2. Use a ternary operator to show "Log out" if user exists, or "SIGN IN" if they don't

  return (
    <nav className="header_wrapper">
      <div className="header_container">
        <img src={evangadiLogo} alt="Logo" />
        <div className="nav_links">
          <span>Home</span>
          <span>How it works</span>
          <button className="blue_btn">
            {/* STUDENT TASK: Logic goes here */}
            SIGN IN
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
