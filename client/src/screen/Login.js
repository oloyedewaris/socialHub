import React, { useState, useEffect } from "react";
import { Button, Form, Input, Alert } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Flux/actions/authActions";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const error = useSelector(state => state.error);

  const history = useHistory();

  useEffect(() => {
    if (auth.isAuthenticated) {
      setRedirect("home");
    } else {
      setRedirect(null);
    }
    window.scrollTo(0, 0);
  }, [auth]);

  useEffect(() => {
    if (redirect) {
      setRedirect("home");
    } else {
      setEmail("");
      setPassword("");
      setMsg(null);
    }
    window.scrollTo(0, 0);
  }, [redirect]);

  useEffect(() => {
    if (error.id === "LOGIN_FAILED") {
      setMsg(error.msg);
      setSubmit(false);
    } else {
      setMsg(null);
    }
  }, [error]);

  const onEmailChange = e => {
    setEmail(e.target.value);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    const newUser = {
      email,
      password
    };
    dispatch(login(newUser));
  };

  const isSubmiting = e => {
    setSubmit(true);
    onFormSubmit(e);
    setMsg(null);
  };

  return (
    <div>
      {!redirect ? (
        <div className="container">
          <h1 className="login-header">Login</h1>
          <Form className="form" onSubmit={isSubmiting}>
            {msg ? (
              <Alert
                className="alert"
                message={msg.length > 50 ? "Internal Server Error" : msg}
                type="error"
                showIcon
                closable
                onClose={() => setMsg(null)}
              />
            ) : null}
            <Form.Item label="Email" name="email">
              <Input
                type="email"
                value={email}
                placeholder="Enter Email"
                onChange={onEmailChange}
              />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password
                type="password"
                value={password}
                placeholder="Password"
                onChange={onPasswordChange}
              />
            </Form.Item>
            <Button
            type="primary"
              onClick={isSubmiting}
              disabled={submit}
              loading={submit}
              danger={msg}
            >
              Submit
            </Button>
            <p>
              Don't have an account, Register{" "}
              <Link style={{ color: "#80bdff" }} to="/register">
                here
              </Link>
            </p>
          </Form>
        </div>
      ) : (
        <div>{history.push("/home")}</div>
      )}
    </div>
  );
};

export default LoginUser;
