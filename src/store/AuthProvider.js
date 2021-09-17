import React, { useState, useEffect, useCallback } from "react";
import AuthContext from "./auth-context";

let logoutTimer;

const calculateRemainingTime = (expiration) => {
  const currTime = new Date().getTime();
  const expTime = +expiration;
  const remTime = expTime - currTime;
  return remTime;
};

const retrieveStoredTokens = () => {
  const storedToken = localStorage.getItem("authTokenMUFLIX");
  const expiresAt = localStorage.getItem("expiresAtMUFLIX");
  const remainingTime = calculateRemainingTime(expiresAt);

  if (remainingTime < 100) {
    localStorage.removeItem("authTokenMUFLIX");
    localStorage.removeItem("expiresAtMUFLIX");
    return null;
  }
  return { token: storedToken, timeLeft: remainingTime };
};

const AuthProvider = (props) => {
  let initialToken;
  const tokenData = retrieveStoredTokens();
  if (tokenData){
    initialToken = tokenData.token;
  }

  const [userToken, setUserToken] = useState(initialToken);
  const userLoggedIn = !!userToken;

  const logoutHandler = useCallback(() => {
    setUserToken(null);
    localStorage.removeItem("authTokenMUFLIX");
    localStorage.removeItem("expiresAtMUFLIX");

    if (logoutTimer){
      clearTimeout(logoutTimer);
    }
  },[]);

  const loginHandler = (details) => {
    const { token, expiresAt } = details;
    setUserToken(token);
    localStorage.setItem("authTokenMUFLIX", token);
    localStorage.setItem("expiresAtMUFLIX", expiresAt);

    const remainingTime = calculateRemainingTime(expiresAt);

    logoutTimer = setTimeout(logoutHandler,remainingTime);
  };

  useEffect(()=>{
    if (tokenData){
      logoutTimer = setTimeout(logoutHandler, tokenData.timeLeft);
    }
  },[tokenData,logoutHandler]);

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
