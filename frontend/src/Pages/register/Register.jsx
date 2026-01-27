import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axiosConfig";
import classes from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const usernameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      await api.post("/users/register", {
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
    <div className={classes.container}>
      <div className={classes["form-wrapper"]}>
        {/* Left side - form */}
        <div className={classes["form-left"]}>
          <h2>Create Account</h2>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>

          <form onSubmit={handleSubmit} className={classes["input-group"]}>
            <input ref={usernameDom} type="text" placeholder="Username" />
            <div className={classes["name-fields"]}>
              <input ref={firstNameDom} type="text" placeholder="First Name" />
              <input ref={lastNameDom} type="text" placeholder="Last Name" />
            </div>
            <input ref={emailDom} type="email" placeholder="Email" />
            <input ref={passwordDom} type="password" placeholder="Password" />

            <div className={classes["checkbox-wrapper"]}>
              <input type="checkbox" id="terms" />{" "}
              <label htmlFor="terms">
                I agree to the <a href="/terms">Terms & Conditions</a>
              </label>
            </div>

            <button type="submit" className={classes.button}>
              Register
            </button>
          </form>
        </div>

        {/* Right side - info panel */}
        <div className={classes["form-right"]}>
          <h2>Evangadi Networks</h2>
          <p>
            Sign up to access all features, track your progress, and connect
            with our community.
          </p>
          <button className={classes["info-button"]}>How It Works</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
