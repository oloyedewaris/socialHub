import React, { useState, useEffect } from "react";
import { Input, Button, Alert } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeSettings } from "../../../redux/actions/authActions";

function Email() {
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.user.email);
  const userId = useSelector(state => state.auth.user._id);
  const error = useSelector(state => state.error);
  const [Error, setError] = useState(null);
  const [Email, setEmail] = useState(email);
  const [Password, setPassword] = useState("");

  useEffect(() => {
    if (error.id === "CHANGE_SETTINGS_FAILED") {
      setError(error.msg);
    }
  }, [error]);

  const onEmailChange = e => {
    setEmail(e.target.value);
    setError(null);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
    setError(null);
  };

  const onButtonClick = () => {
    const newUpdate = {
      userId,
      email: Email,
      password: Password,
      type: "dataChange"
    };

    dispatch(changeSettings(newUpdate));
    setError(null);
  };

  return (
    <div>
      {Error ? <Alert message={Error} type="error" /> : null}
      <div className="settings-container">
        <h4>Edit Email</h4>
        <div className="settings-space">
          <Input type="text" onChange={onEmailChange} value={Email} />
        </div>
        <h4>Enter Password</h4>
        <div className="settings-space">
          <Input type="password" onChange={onPasswordChange} value={Password} />
        </div>
        <Button onClick={onButtonClick}>Done</Button>
      </div>
    </div>
  );
}

export default Email;
