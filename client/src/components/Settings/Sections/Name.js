import React, { useState, useEffect, useRef } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Input, Button, Alert } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeSettings } from "../../../redux/actions/authActions";
import Wrapper from "../../../hoc/navWrapper";

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
    <Wrapper>
      <div>
        <div style={{ margin: "10px" }}>
          <Link to="/profile/settings">
            <ArrowLeftOutlined />
          </Link>
        </div>
        {Error ? <Alert message={Error} /> : null}
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
            <Input
              type="password"
              onChange={onPasswordChange}
              value={Password}
            />
          </div>
          <Button onClick={onButtonClick}>Done</Button>
        </div>
      </div>
    </Wrapper>
  );
}

export default Name;
