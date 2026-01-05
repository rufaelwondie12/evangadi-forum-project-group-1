import React, { useRef } from "react";
import axiosBase from "../../../services/axiosConfig";
import { useNavigate } from "react-router-dom";
import classes from './Register.module.css'

const Register = () => {
  // Sami/Yosi: Add state for username, firstname, lastname, email, password
  const navigate = useNavigate();
  const usernameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Sami/Yosi:
    // 1. Call axiosBase.post("/user/register")

    // 2. Handle success (navigate to login)
    const usernameValue = usernameDom.current.value;
    const firstnameValue = firstNameDom.current.value;
    const lastnameValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("Please provide all required information");
      return;
    }

    try {
      await axiosBase.post("/user/register", {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });
      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (error) {
      alert("Something went wrong");
      console.log(error.response);
    }
  };

  return (
    <section>
      <h2>Join the network</h2>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
      <form onSubmit={handleSubmit}>
        <input ref={usernameDom} type="text" placeholder="Username" />
        <div className={classes["name-fields"]}>
          <input ref={firstNameDom} type="text" placeholder="First Name" />
          <input ref={lastNameDom} type="text" placeholder="Last Name" />
        </div>
        <input ref={emailDom} type="email" placeholder="Email" />
        <input ref={passwordDom} type="password" placeholder="Password" />

        <button type="submit" className={classes.button}>
          Agree and Join
        </button>
      </form>
    </section>
  );
};

export default Register;
