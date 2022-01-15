import React, { useState, useEffect, } from "react";
import { Input, Button, Alert } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeSettings } from "../../../redux/actions/authActions";

function Bio() {
  const dispatch = useDispatch();
  const bio = useSelector(state => state.auth.user.bio);
  const userId = useSelector(state => state.auth.user._id);
  const error = useSelector(state => state.error);
  const [Error, setError] = useState(null);
  const [Bio, setBio] = useState(bio);
  const [Password, setPassword] = useState("");

  useEffect(() => {
    if (error.id === "CHANGE_SETTINGS_FAILED") {
      setError(error.msg);
    }
  }, [error]);

  const onBioChange = e => {
    setBio(e.target.value);
    setError(null);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
    setError(null);
  };

  const onButtonClick = () => {
    const newUpdate = {
      userId,
      bio: Bio,
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
        <h4>Edit Bio</h4>
        <div className="settings-space">
          <Input type="text" onChange={onBioChange} value={Bio} />
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

export default Bio;
