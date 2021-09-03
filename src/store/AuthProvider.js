import React, { useState, useEffect } from "react";
import AuthContext from "./auth-context";

let logoutTimer;

const calculateRemainingTime = (expiration) => {
  const currTime = new Date().getTime();
  const expTime = +expiration;
  const remTime = expTime - currTime;
  return remTime;
};

const retrieveStoredTokens = () => {
  const storedToken = localStorage.getItem("authToken");
  const expiresAt = localStorage.getItem("expiresAt");
  const remainingTime = calculateRemainingTime(expiresAt);

  if (remainingTime < 1000) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("expiresAt");
    return;
  }
  return { token: storedToken, timeLeft: remainingTime };
};

const AuthProvider = (props) => {
  let initialToken;
  const tokenData = retrieveStoredTokens();
  if (tokenData){
    initialToken = tokenData.storedToken;
  }

  const [userToken, setUserToken] = useState(initialToken);
  const userLoggedIn = !!userToken;

  const logoutHandler = () => {
    setUserToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("expiresAt");

    if (logoutTimer){
      clearTimeout(logoutTimer);
    }
  };

  const loginHandler = (details) => {
    const { token, expiresAt } = details;
    setUserToken(token);
    localStorage.setItem("authToken", token);
    localStorage.setItem("expiresAt", expiresAt);

    const remainingTime = calculateRemainingTime(expiresAt);

    logoutTimer = setTimeout(logoutHandler,remainingTime);
  };

  useEffect(()=>{
    if (tokenData){
      logoutTimer = setTimeout(logoutHandler, tokenData.timeLeft);
    }
  },[tokenData]);

  const contextValue = {
    token: userToken,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
