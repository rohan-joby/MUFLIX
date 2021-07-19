import React from "react";
import { Link } from "react-router-dom";

import Muflix from "../../assets/Muflix-logo.PNG";
import Background from "../../assets/Register-bg.jpg";
import classes from "./SignUp.module.css";

const SignUp = () => {
  return (
    <div className={classes.container} style={{backgroundImage:`url(${Background})`}}>
      <img src={Muflix} alt="logo" className={classes.logo} />
      <form className={classes.input__form}>
        <h1 className={classes.heading}>Sign Up</h1>
        <input type="text" className={classes.input} name="username" placeholder="Your name" />
        <input type="email" className={classes.input} name="email" placeholder="Email" />
        <input type="text" className={classes.input} name="password" placeholder="Password" />
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
          Do you already have an account? <Link>Log In</Link>
        </h2>
      </form>
    </div>
  );
};

export default SignUp;
