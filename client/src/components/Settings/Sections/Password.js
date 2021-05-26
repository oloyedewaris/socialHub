import React, { useState, useEffect, useRef } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Input, Button, Alert } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeSettings } from "../../../Flux/actions/authActions";
import Wrapper from "../../../hoc/navWrapper";

function Password() {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user._id);
  const error = useSelector(state => state.error);
  const [Error, setError] = useState(null);
  const [Password, setPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (error.id === "CHANGE_SETTINGS_FAILED") {
        setError(error.msg);
      } else {
        setError(null);
      }
    }
  }, [error]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onPasswordChange = e => {
    setPassword(e.target.value);
    setError(null);
  };

  const onNewPasswordChange = e => {
    setNewPassword(e.target.value);
    setError(null);
  };

  const onConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value);
    setError(null);
  };

  const onButtonClick = () => {
    const newUpdate = {
      userId,
      password: Password,
      newPassword: NewPassword,
      type: "passwordChange"
    };
    if (NewPassword === ConfirmPassword) {
      dispatch(changeSettings(newUpdate));
      setError(null);
      setNewPassword("");
      setConfirmPassword("");
      setPassword("");
    } else {
      setError("Password don't match");
    }
  };

  return (
    <Wrapper>
      <div style={{ margin: "10px" }}>
        <div>
          <Link to="/profile/settings">
            <ArrowLeftOutlined />
          </Link>
        </div>
        {Error ? <Alert message={Error} /> : null}
        <div className="settings-container">
          <h4>Change Password</h4>
          <div className="settings-space">
            <Input
              placeholder="Enter Password"
              onChange={onPasswordChange}
              type="password"
            />
          </div>
          <div className="settings-space">
            <Input.Password
              placeholder="Enter New Password"
              onChange={onNewPasswordChange}
              type="password"
            />
          </div>
          <div className="settings-space">
            <Input.Password
              placeholder="Confirm New Password"
              onChange={onConfirmPasswordChange}
              type="password"
            />
          </div>
          <Button onClick={onButtonClick}>Done</Button>
        </div>
      </div>
    </Wrapper>
  );
}

export default Password;
