import React from "react";
import evangadiFooter from "../../assets/images/footer-logo.png";
import "./Footer.module.css";

const Footer = () => {
  return (
    <footer className="footer_wrapper">
      <div className="footer_container">
        {/* STUDENT TASK: Arrange these columns using Flexbox in Footer.css */}
        <div className="footer_column">
          <img src={evangadiFooter} alt="Logo" />
        </div>
        <div className="footer_column">
          <h3>Useful Links</h3>
          {/* List items go here */}
        </div>
        <div className="footer_column">
          <h3>Contact Info</h3>
          {/* Contact details go here */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
