import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import axiosBase from "@/services/axiosConfig";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
// import api from "../../axiosConfig";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (!emailValue || !passwordValue) {
      alert("Please provide all required information");
      return;
    }

    try {
      const { data } = await api.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });
      alert("Login successfully.");
      localStorage.setItem("token", data.token);
      navigate("/");
      console.log(data);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  };

  return (
    <>
      
      {/* Main Content */}
      <main className={classes.container}>
        {/* Login Form */}
        <form onSubmit={handleSubmit} className={classes.inputGroup}>
          <h2>Login to your account</h2>

          <input ref={emailDom} type="email" placeholder="Email" />

          <input ref={passwordDom} type="password" placeholder="Password" />

          <div className={classes.checkboxWrapper}>
            <Link to="/terms">Forget password</Link>
          </div>

          <button type="submit" className={classes.button}>
            Login
          </button>
        </form>

      </main>
    </>
  );
};

export default Login;
