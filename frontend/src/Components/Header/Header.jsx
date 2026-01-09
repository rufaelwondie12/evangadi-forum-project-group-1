import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import classes from "./Header.module.css";
import logo from "../../assets/images/Header-logo.png";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuth = () => {
    if (user) {
      // If logged in, log the user out and redirect to home
      logout();
      navigate("/");
    } else {
      // If not logged in, send them to the register/login page
      navigate("/register");
    }
  };

  return (
    <header className={classes.headerWrapper}>
      <div className={classes.headerContainer}>
        {/* Logo links back to the landing page */}
        <Link to="/" className={classes.logoLink}>
          <img src={logo} alt="Evangadi Logo" />
        </Link>

        <nav className={classes.navMenu}>
          <Link to="/" className={classes.navItem}>
            Home
          </Link>

          <a
            href="https://www.evangadi.com/how-it-works/"
            target="_blank"
            rel="noreferrer"
            className={classes.navItem}
          >
            How it Works
          </a>

          <button className={classes.authButton} onClick={handleAuth}>
            {user ? "LOG OUT" : "SIGN IN"}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
