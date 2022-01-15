import React, { useState, useEffect } from "react";
import { Input, Button, Alert } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeSettings } from "../../../redux/actions/authActions";

function Password() {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user._id);
  const error = useSelector(state => state.error);
  const [Error, setError] = useState(null);
  const [Password, setPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (error.id === "CHANGE_SETTINGS_FAILED") {
      setError(error.msg);
    }
  }, [error]);

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
    } else {
      setError("Password don't match");
    }
  };

  return (
    <div>
      {Error ? <Alert message={Error} type="error" /> : null}
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
  );
}

export default Password;
