import React, { Fragment, useContext } from "react";
import SignUp from "../components/Auth/SignUp";
import AuthContext from "../store/auth-context";

const Register = () => {
  // const authCtx = useContext(AuthContext);
  // const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Fragment>
      <SignUp />
    </Fragment>
  );
};

export default Register;
//{isLoggedIn && 