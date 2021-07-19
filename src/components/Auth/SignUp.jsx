import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";

import Muflix from "../../assets/Muflix-logo.PNG";
import Background from "../../assets/Register-bg.jpg";

import { signUp } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const authCtx = useContext(AuthContext);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  //error handling
  const submitHandler = (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const registerDetails = signUp({ username, email, password });
    authCtx.login(registerDetails);
  };

  return (
    <div
      className={classes.container}
      style={{ backgroundImage: `url(${Background})` }}
    >
      <img src={Muflix} alt="logo" className={classes.logo} />
      <form className={classes.input__form} onSubmit={submitHandler}>
        <h1 className={classes.heading}>Sign Up</h1>
        <input
          type="text"
          className={classes.input}
          name="username"
          placeholder="Your name"
          ref={usernameRef}
        />
        <input
          type="email"
          className={classes.input}
          name="email"
          placeholder="Email"
          ref={emailRef}
        />
        <input
          type="text"
          className={classes.input}
          name="password"
          placeholder="Password"
          ref={passwordRef}
        />
        <input
          type="text"
          className={classes.input}
          name="password-repeat"
          placeholder="Repeat your password"
        />
        <button type="submit" className={classes.btn__primary}>
          Sign Up
        </button>
        <h2 className={classes.signIn__link}>
          Do you already have an account? <Link to="/login">Log In</Link>
        </h2>
      </form>
    </div>
  );
};

export default SignUp;
