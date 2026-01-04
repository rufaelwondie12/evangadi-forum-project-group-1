import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import axiosBase from "../../../axios/axiosConfig";

const Login = () => {
  const { setUser } = useAuth();
  // Sami/Yosi: Add your state for email and password here

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Sami/Yosi:
    // 1. Call axiosBase.post("/user/login")
    // 2. Save token to localStorage
    // 3. Update state with setUser()
  };

  return (
    <section>
      <h2>Login to your account</h2>
      <form onSubmit={handleSubmit}>
        {/* Add Email and Password inputs here */}
        <button type="submit" className="orange_btn">
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
