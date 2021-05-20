import React from "react";
import { useSelector } from "react-redux";
import Login from "../screen/Login";

function Auth(Component) {
  const AuthCheck = (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (isAuthenticated) {
      return <Component {...props} />;
    } else {
      return <Login />;
    }
  };
  return AuthCheck;
}

export default Auth;
