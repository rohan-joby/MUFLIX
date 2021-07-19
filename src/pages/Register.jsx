import React, { Fragment, useContext } from "react";
import SignUp from "../components/Auth/SignUp";
import LogIn from "../components/Auth/LogIn";
import AuthContext from "../store/auth-context";

const Register = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Fragment>
      {isLoggedIn ? <LogIn /> : <SignUp />};
    </Fragment>
  );
};

export default Register;
