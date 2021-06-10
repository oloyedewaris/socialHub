import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";
import { login } from "../Flux/actions/authActions";
import Login from "../screen/Login";

function Auth(Component) {
  const AuthCheck = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    useEffect(() => {
      if (!isAuthenticated && email && password) {
        dispatch(login({ email, password }));
      }
    }, []);

    if (isAuthenticated) {
      return <Component />;
    } else {
      if (email && password) {
        if (isAuthenticated) {
          return <Component />;
        } else {
          return (
            <div className="loader">
              <Spin size="large" />
              <h2>Loading previous user</h2>
            </div>
          );
        }
      } else {
        return <Login />;
      }
    }
  };
  return AuthCheck;
}

export default Auth;
