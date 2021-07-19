import React, { useState } from "react";
import AuthContext from "./auth-context";

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const userLoggedIn = !!token;

  const loginHandler = (details) => {
    const {token,expiresAt} = details;
    setToken(token);
    localStorage.setItem("authToken",token);
    localStorage.setItem("expiresAt",expiresAt);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("expiresAt");
  };

  const contextValue = {
      token: token,
      isLoggedIn: userLoggedIn,
      login: loginHandler,
      logout: logoutHandler
  }

  return (
  <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;