import React from "react";
import { Link } from "react-router-dom";

import Muflix from "../../assets/Muflix-logo.PNG";
import Background from "../../assets/Register-bg.jpg";
import classes from "./LogIn.module.css";

const LogIn = () => {
  return (
    <div className={classes.container} style={{backgroundImage:`url(${Background})`}}>
      <img src={Muflix} alt="logo" className={classes.logo} />
      <form className={classes.input__form}>
        <h1 className={classes.heading}>Log In</h1>
        <input type="email" className={classes.input} name="email" placeholder="Email" />
        <input type="text" className={classes.input} name="password" placeholder="Password" />
      
        <button type="submit" className={classes.btn__primary}>
          Log In
        </button>
        <button type="submit" className={classes.btn__secondary}>
          Log In anonymously
        </button>
        <h2 className={classes.signIn__link}>
        Haven't you registered yet? <Link>Sign Up</Link>
        </h2>
      </form>
    </div>
  );
};

export default LogIn;
