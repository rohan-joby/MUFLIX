import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import Muflix from "../../assets/Muflix-logo.PNG";
import MuflixSmall from "../../assets/Muflix-small.png";

import Background from "../../assets/Register-bg.jpg";

import { logIn } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import InputPasswordField from "../UI/InputPasswordField";
import useWindowWidth from "../../hooks/useWindowWidth";

import { useAuth } from "../../store/auth-context";
import classes from "./LogIn.module.css";

//Minimum six characters, at least one uppercase letter, one lowercase letter and one number

const emailValidation = (value) => {
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(value);
};
const passwordValidation = (value) => {
  const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  return regexp.test(value);
};

const LogIn = () => {
  const history = useHistory();
  const { login } = useAuth();
  const width = useWindowWidth();

  const {
    value: emailInput,
    isValid: emailIsValid,
    hasError: emailHasError,
    updateValue: updateEmailValue,
    updateTouch: updateEmailTouch,
    reset: resetEmail,
  } = useInput(emailValidation);

  const {
    value: passwordInput,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    updateValue: updatePasswordValue,
    updateTouch: updatePasswordTouch,
    reset: resetPassword,
  } = useInput(passwordValidation);

  const { sendRequest, status, data, error } = useHttp(logIn);

  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  useEffect(() => {
    if (status === "completed" && error === null) {
      history.push("/");
    }
  }, [history, error, status]);

  useEffect(() => {
    if (status === "completed" && error === null && data !== null) {
      const { token, expiresAt } = data;
      login({ token, expiresAt });
    }
  }, [status, error, data, login]);

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (!formIsValid) {
        return;
      }

      const details = { email: emailInput, password: passwordInput };
      sendRequest(details);

      resetEmail();
      resetPassword();
    },
    [
      emailInput,
      passwordInput,
      formIsValid,
      resetPassword,
      resetEmail,
      sendRequest,
    ]
  );
  const handleGuestLogin = () => {
    const details = { email: "joby@joby.com", password: "Joby1964" };
    sendRequest(details);
    // login(details);
    // history.push("/");

    resetEmail();
    resetPassword();
  };
  const src = width > 600 ? Muflix : MuflixSmall;

  return (
    <div
      className={classes.container}
      style={{ backgroundImage: `url(${Background})` }}
    >
      <img src={src} alt="logo" className={classes.logo} />
      <form className={classes.input__form} onSubmit={submitHandler}>
        <h1 className={classes.heading}>Log In</h1>
        <input
          type="email"
          className={`${classes.input} ${emailHasError ? classes.invalid : ""}`}
          name="email"
          placeholder="Email"
          value={emailInput}
          onChange={updateEmailValue}
          onBlur={updateEmailTouch}
        />
        {emailHasError && (
          <p className={classes.error}>Please provide a valid email</p>
        )}
        <InputPasswordField
          error={passwordHasError}
          placeholder="Password"
          value={passwordInput}
          onChange={updatePasswordValue}
          onBlur={updatePasswordTouch}
        />
        {passwordHasError && (
          <p className={classes.error}>
            Password must contain minimum six characters, at least one uppercase
            letter, one lowercase letter and one number
          </p>
        )}
        <button
          type="submit"
          disabled={!formIsValid}
          className={classes.btn__primary}
        >
          Log In
        </button>
        <button
          type="submit"
          className={classes.btn__secondary}
          onClick={handleGuestLogin}
        >
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
