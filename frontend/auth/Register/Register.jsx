import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// Redirect after successful registration
import api from "../../services/axiosConfig";
import classes from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();

  const usernameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  const termsDom = useRef();

  //   Error & loading;
  const [loading, setLoading] = useState(false);

  //   Handle input changes
  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameDom.current.value.trim();
    const firstname = firstNameDom.current.value.trim();
    const lastname = lastNameDom.current.value.trim();
    const email = emailDom.current.value.trim();
    const password = passwordDom.current.value;
    const termsAccepted = termsDom.current.checked;

    if (!username || !firstname || !lastname || !email || !password) {
      alert("Please provide all required information");
      return;
    }

    if (!termsAccepted) {
      alert("You must agree to the Terms & Conditions");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    // Reset UI state
    try {
      setLoading(true);

      // Calls backend and Redirects on success
      await api.post("/users/register", {
        username,
        firstname,
        lastname,
        email,
        password,
      });

      alert("Registered successfully. Please login.");
      navigate("/login");

      //   Displays backend error
    } catch (error) {
      const message =
        error.response?.data?.msg || "Registration failed. Try again.";
      alert(message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  //   Shows only if error exists

  return (
    <div className={classes.container}>
      <div className={classes["form-wrapper"]}>
        <div className={classes["form-left"]}>
          <h2>Create Account</h2>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>

          <form onSubmit={handleSubmit} className={classes["input-group"]}>
            {/* type=""
              name=""
              placeholder=""
              onChange={handleChange}
              required */}

            <input ref={usernameDom} type="text" placeholder="Username" />
            <div className={classes["name-fields"]}>
              <input ref={firstNameDom} type="text" placeholder="First Name" />
              <input ref={lastNameDom} type="text" placeholder="Last Name" />
            </div>
            <input ref={emailDom} type="email" placeholder="Email" />
            <input ref={passwordDom} type="password" placeholder="Password" />

            <div className={classes["checkbox-wrapper"]}>
              <input ref={termsDom} type="checkbox" id="terms" />
              <label htmlFor="terms">
                I agree to the <Link to="/terms">Terms & Conditions</Link>
              </label>
            </div>

            <button type="submit" className={classes.button} disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>

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
