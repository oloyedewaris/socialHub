import React, { useState, useEffect } from "react";
import { Input, Button, Alert } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeSettings } from "../../../redux/actions/authActions";

function Name() {
  const dispatch = useDispatch();
  const firstName = useSelector(state => state.auth.user.firstName);
  const lastName = useSelector(state => state.auth.user.lastName);
  const userId = useSelector(state => state.auth.user._id);
  const error = useSelector(state => state.error);
  const [Error, setError] = useState(null);
  const [FirstName, setFirstName] = useState(firstName);
  const [LastName, setLastName] = useState(lastName);
  const [Password, setPassword] = useState("");

  useEffect(() => {
    if (error.id === "CHANGE_SETTINGS_FAILED") {
      setError(error.msg);
    }
  }, [error]);

  const onFirstNameChange = e => {
    setFirstName(e.target.value);
    setError(null);
  };

  const onLastNameChange = e => {
    setLastName(e.target.value);
    setError(null);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
    setError(null);
  };

  const onButtonClick = () => {
    const newUpdate = {
      userId,
      firstName: FirstName,
      lastName: LastName,
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
        <h4>Edit First Name</h4>
        <div className="settings-space">
          <Input type="text" onChange={onFirstNameChange} value={FirstName} />
        </div>
        <h4>Edit Last Name</h4>
        <div className="settings-space">
          <Input type="text" onChange={onLastNameChange} value={LastName} />
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

export default Name;
