import React, { Fragment, useContext } from "react";
import LogIn from "../components/Auth/LogIn";
import AuthContext from "../store/auth-context";

const Login = () => {
//   const authCtx = useContext(AuthContext);
//   const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Fragment>
      <LogIn />
    </Fragment>
  );
};

export default Login;
//{isLoggedIn && 