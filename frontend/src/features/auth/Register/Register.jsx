import React, { useState } from "react";
import { registerUser } from "../authService";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (err) {
      setError(err.message);
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
