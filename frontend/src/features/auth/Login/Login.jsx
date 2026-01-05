import React, { useRef } from "react";
// import { useAuth } from "../../../context/AuthContext";
import axiosBase from "../../../services/axiosConfig";
import classes from "./Login.module.css";

const Login = () => {
  // const { setUser } = useAuth();
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  // Sami/Yosi: Add your state for email and password here

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (!emailValue || !passwordValue) {
      alert("Please provide all required information");
      return;
    }

    try {
      const { data } = await axiosBase.post("/user/login", {
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
    <section className={classes.container}>
      <h2>Login to your account</h2>
      <form onSubmit={handleSubmit} className={classes.inputGroup}>
        {/* Add Email and Password inputs here */}
        <input ref={emailDom} type="email" placeholder="Email" />

        <input ref={passwordDom} type="password" placeholder="Password" />
        <div className={classes.checkboxWrapper}>
          <Link to="/terms">Forget password</Link>
        </div>
        <button type="submit" className={classes.button}>
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
