import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { Alert } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Flux/actions/authActions";

const RegisterUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setMsg(null);
    }
    window.scrollTo(0, 0);
  }, [redirect]);

  useEffect(() => {
    if (error.id === "REGISTER_FAILED") {
      setMsg(error.msg);
      setSubmit(false);
    } else {
      setMsg(null);
    }
  }, [error]);

  const onFirstnameChange = e => {
    setFirstName(e.target.value);
  };

  const onLastnameChange = e => {
    setLastName(e.target.value);
  };

  const onEmailChange = e => {
    setEmail(e.target.value);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
  };

  const onConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    if (password === confirmPassword) {
      const newUser = {
        firstName,
        lastName,
        email,
        password
      };
      dispatch(register(newUser));
    } else {
      setMsg("Password did not match");
      setSubmit(false);
    }
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
          <h1 className="login-header">Register</h1>
          <Form className="form">
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
            <Form.Item label="First Name" name="First Name">
              <Input
                type="text"
                value={firstName}
                placeholder="Enter first name"
                onChange={onFirstnameChange}
              />
            </Form.Item>
            <Form.Item label="Last Name" name="Last Name">
              <Input
                type="text"
                value={lastName}
                placeholder="Enter last name"
                onChange={onLastnameChange}
              />
            </Form.Item>
            <Form.Item label="Email" name="Email">
              <Input
                type="email"
                value={email}
                placeholder="Enter Email"
                onChange={onEmailChange}
              />
            </Form.Item>
            <Form.Item label="Password" name="Password">
              <Input.Password
                type="password"
                value={password}
                placeholder="Password"
                onChange={onPasswordChange}
              />
            </Form.Item>
            <Form.Item label="Confirm Password" name="Confirm Password">
              <Input.Password
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={onConfirmPasswordChange}
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
            <p className="mx-auto">
              Already have an account, Log in{" "}
              <Link style={{ color: "#80bdff" }} to="/">
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

export default RegisterUser;
