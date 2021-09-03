import React, { useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";

import Muflix from "../../assets/Muflix-logo.PNG";
import Background from "../../assets/Register-bg.jpg";

import { signUp } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import InputPasswordField from "../UI/InputPasswordField";

import { useAuth } from "../../store/auth-context";
import classes from "./SignUp.module.css";

const emailValidation = (value) => {
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(value);
};
const passwordValidation = (value) => {
  const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  return regexp.test(value);
};

const usernameValidation = (value) => {
  const regexp = /^(?!\s*$).+/;
  return regexp.test(value);
};

const SignUp = () => {
  const history = useHistory();
  const { login } = useAuth();

  const { sendRequest, status, data, error } = useHttp(signUp);

  const {
    value: usernameInput,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    updateValue: updateUsernameValue,
    updateTouch: updateUsernameTouch,
    reset: resetUsername,
  } = useInput(usernameValidation);

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

  let formIsValid = false;
  if (usernameIsValid && emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  useEffect(()=>{
    if (status==="completed" && error === null){
      history.push("/");
    }
  },[history, error, status])

  useEffect(()=>{
    if (status==="completed" && error === null && data !== null){
      const {token, expiresAt} = data;
      login({token, expiresAt});
    }
  },[status, error, data, login])

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (!formIsValid) {
        return;
      }

      const details = { username: usernameInput, email: emailInput, password: passwordInput };
      sendRequest(details);

      resetUsername();
      resetEmail();
      resetPassword();
    },
    [usernameInput, emailInput, passwordInput, formIsValid, resetPassword, resetEmail, resetUsername, sendRequest]
  );

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
          className={`${classes.input} ${usernameHasError ? classes.invalid : ""}`}
          name="username"
          placeholder="Your name"
          value={usernameInput}
          onChange={updateUsernameValue}
          onBlur={updateUsernameTouch}
        />
        {usernameHasError && (
          <p className={classes.error}>Please provide a valid username</p>
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
          <p className={classes.error}>
            Password must contain minimum six characters, at least one uppercase
            letter, one lowercase letter and one number
          </p>
        )}
        <button type="submit" disabled={!formIsValid} className={classes.btn__primary}>
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
