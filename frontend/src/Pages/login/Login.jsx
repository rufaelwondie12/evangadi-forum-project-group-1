import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axiosConfig";
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
      {/* Navbar */}
      <header className={classes.navbar}>
        <div className={classes.logo}>EVANGADI</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/how-it-works">How it works</Link>
          <a href="/login">
            <button className={classes["btn-signin"]}>SIGN IN</button>
          </a>
          {/* <Link to="/login"></Link> */}
        </nav>
      </header>

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

        {/* About Section */}
        <section className={classes.about}>
          <span className={classes["about-title"]}>About</span>
          <h1>Evangadi Networks</h1>

          <p>
            No matter what stage of life you are in, whether you are just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
          </p>

          <p>
            Whether you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>

          <button className={classes["btn-how"]}>HOW IT WORKS</button>
        </section>
      </main>
    </>
  );
};

export default Login;
