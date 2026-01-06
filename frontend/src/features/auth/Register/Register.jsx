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
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <p className={styles.error_msg}>{error}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />

      <div className={styles.name_row}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
      </div>

      <input
        type="text"
        name="username"
        placeholder="User Name"
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <button type="submit" className={styles.blue_btn} disabled={loading}>
        {loading ? "Joining..." : "Agree and Join"}
      </button>
    </form>
  );
};

export default Register;
