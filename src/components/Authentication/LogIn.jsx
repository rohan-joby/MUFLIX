import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import { GoAlert } from "react-icons/go";
import Muflix from "../../assets/Muflix-logo.PNG";
import MuflixSmall from "../../assets/Muflix-small.png";

import Background from "../../assets/Register-bg.jpg";

import { logIn } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import InputPasswordField from "./InputPasswordField";
import useWindowWidth from "../../hooks/useWindowWidth";

import { useAuth } from "../../store/auth-context";
import classes from "./LogIn.module.css";

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
  const [errorMessage, setErrorMessage] = useState("");

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

  const { sendRequest, status: loginStatus, data, error } = useHttp(logIn);

  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  useEffect(() => {
    if (loginStatus === "completed" && error === null) {
      history.push("/");
    }
  }, [history, error, loginStatus]);

  useEffect(() => {
    if (loginStatus === "completed" && error !== null) {
      setErrorMessage(
        "Sorry, but we can't find an account with this email address. Please try again."
      );
    }
  }, [error, loginStatus]);

  useEffect(() => {
    if (loginStatus === "completed" && error === null && data !== null) {
      const { token, expiresAt } = data;
      login({ token, expiresAt });
    }
  }, [loginStatus, error, data, login]);

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
    const details = { email: "test@test.com", password: "Test1964" };
    sendRequest(details);

    resetEmail();
    resetPassword();
  };
  const src = width > 600 ? Muflix : MuflixSmall;

  return (
    <div
      className={classes.container}
      style={{ backgroundImage: `url(${Background})` }}
    >
      <img src={src} height={48} alt="logo" className={classes.logo} />
      <form className={classes.input__form} onSubmit={submitHandler}>
        <h1 className={classes.heading}>Log In</h1>
        {errorMessage && (
          <div className={classes.alert}>
            <GoAlert size={20} />
            <h4>{errorMessage}</h4>
          </div>
        )}
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
          <div className={classes.error}>
            <h4>Your password must contain:</h4>
            <ul>
              <li>▪ &nbsp; minimum six characters</li>
              <li>▪ &nbsp; at least one uppercase letter</li>
              <li>▪ &nbsp; at least one lowercase letter</li>
              <li>▪ &nbsp; at least one number</li>
              <li>▪ &nbsp; no special characters</li>
            </ul>
          </div>
        )}
        <button
          type="submit"
          disabled={!formIsValid}
          className={classes.btn__primary}
        >
          {loginStatus === "pending" ? <div className={classes.loader} /> :"Log In"}
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
