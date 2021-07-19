import React, { useState } from "react";
import AuthContext from "./auth-context";

export const AuthContextProvider = (props) => {
  const [userToken, setUserToken] = useState(null);
  const userLoggedIn = !!userToken;

  const loginHandler = (details) => {
    const {token,expiresAt} = details;
    setUserToken(token);
    localStorage.setItem("authToken",token);
    localStorage.setItem("expiresAt",expiresAt);
    console.log(token);
    console.log(userToken);
  };

  const logoutHandler = () => {
    setUserToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("expiresAt");
  };

  const contextValue = {
      token: userToken,
      isLoggedIn: userLoggedIn,
      login: loginHandler,
      logout: logoutHandler
  }

  return (
  <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;