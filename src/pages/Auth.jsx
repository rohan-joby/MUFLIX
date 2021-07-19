import React, { Fragment } from "react";
import SignUp from "../components/Auth/SignUp";
import LogIn from "../components/Auth/LogIn";

const Auth = () => {
  const isSignedUp = true;
  return (
    <Fragment>
      {isSignedUp ? <LogIn /> : <SignUp />};
    </Fragment>
  );
};

export default Auth;
