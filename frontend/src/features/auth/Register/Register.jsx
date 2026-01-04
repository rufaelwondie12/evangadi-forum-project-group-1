import React, { useState } from "react";
import axiosBase from "../../../axios/axiosConfig";

const Register = () => {
  // Sami/Yosi: Add state for username, firstname, lastname, email, password

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Sami/Yosi:
    // 1. Call axiosBase.post("/user/register")
    // 2. Handle success (navigate to login)
  };

  return (
    <section>
      <h2>Join the network</h2>
      <form onSubmit={handleSubmit}>
        {/* Add all 5 registration inputs here */}
        <button type="submit" className="orange_btn">
          Agree and Join
        </button>
      </form>
    </section>
  );
};

export default Register;
