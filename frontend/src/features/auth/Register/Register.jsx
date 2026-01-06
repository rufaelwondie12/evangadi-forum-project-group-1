import React, { useState } from "react";
import axiosBase from "@/services/axiosConfig";
import styles from "./Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await axiosBase.post("/user/register", formData);
      setSuccess("Account created successfully. Please login.");
      setFormData({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.msg || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={classes.section}>
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
