import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import Muflix from "../../assets/Muflix-logo.PNG";
import Background from "../../assets/Register-bg.jpg";

import { logIn } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import classes from "./LogIn.module.css";

const LogIn = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    //error handling

    const details = logIn({ email, password });
    if (details){
      authCtx.login(details);
      history.push("/");
    }
  };
  return (
    <div
      className={classes.container}
      style={{ backgroundImage: `url(${Background})` }}
    >
      <img src={Muflix} alt="logo" className={classes.logo} />
      <form className={classes.input__form} onSubmit={submitHandler}>
        <h1 className={classes.heading}>Log In</h1>
        <input
          type="email"
          ref={emailRef}
          className={classes.input}
          name="email"
          placeholder="Email"
        />
        <input
          type="text"
          ref={passwordRef}
          className={classes.input}
          name="password"
          placeholder="Password"
        />

        <button type="submit" className={classes.btn__primary}>
          Log In
        </button>
        <button type="submit" className={classes.btn__secondary}>
          Log In anonymously
        </button>
        <h2 className={classes.signIn__link}>
          Haven't you registered yet? <Link to="/register">Sign Up</Link>
        </h2>
      </form>
    </div>
  );
};

export default LogIn;
