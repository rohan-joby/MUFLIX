import React, { useContext } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export default AuthContext;

export const useAuth = () => {
  return useContext(AuthContext);
};
