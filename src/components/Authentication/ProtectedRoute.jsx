import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../store/auth-context";

const ProtectedRoute = ({ path, ...props }) => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {isLoggedIn ? (
        <Route to={path} {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: path } }} />
      )}
    </>
  );
};

export default ProtectedRoute;
