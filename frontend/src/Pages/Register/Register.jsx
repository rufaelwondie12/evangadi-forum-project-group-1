import { useRef } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const usernameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
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
      alert("please provide all required informatin");
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
      alert("registerd successfull. please login");
      navigate("/login");
    } catch (error) {
      alert("something went wrong");
      console.log(error.response);
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>username: ..</span>
          <input ref={usernameDom} type="text" placeholder="username" />
        </div>
        <br />
        <div>
          <span>first name: ..</span>
          <input ref={firstNameDom} type="text" placeholder="first name" />
        </div>
        <br />
        <div>
          <span>last name: ..</span>
          <input ref={lastNameDom} type="text" placeholder="last name" />
        </div>
        <br />
        <div>
          <span>email: ..</span>
          <input ref={emailDom} type="email" placeholder="email" />
        </div>
        <br />
        <div>
          <span>password: ..</span>
          <input ref={passwordDom} type="password" placeholder="password" />
        </div>

        <button type="submit">Register</button>
      </form>
    </section>
  );
};

export default Register;
