import React, { useState, useEffect, useRef } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
  Alert,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeSettings } from "../../../Flux/actions/usersActions";
import Wrapper from "../../../hoc/navWrapper";

function Password() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const error = useSelector((state) => state.error);
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

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setError(null);
  };

  const onNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setError(null);
  };

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError(null);
  };

  const onButtonClick = () => {
    const newUpdate = {
      userId,
      password: Password,
      newPassword: NewPassword,
      type: "passwordChange",
    };
    if (NewPassword === ConfirmPassword) {
      dispatch(changeSettings(newUpdate));
    } else {
      setError("Password don't match");
    }
  };

  return (
    <Wrapper>
    <div style={{ margin: "10px" }}>
      <div>
        <Link to="/profile/settings">
          <ArrowLeftOutlined style={{ color: "black", fontSize: "1.5rem" }} />
        </Link>
      </div>
      {Error ? (
        <Alert message={Error}/>
      ) : null}
      <div>
        <div>
          <div>
            <div>Change Password</div>
            <div>
              <Input
                placeholder="Enter Password"
                onChange={onPasswordChange}
                type="password"
              />
            </div>
            <div>
              <Input
                placeholder="Enter New Password"
                onChange={onNewPasswordChange}
                type="password"
              />
            </div>
            <div>
              <Input
                placeholder="Confirm New Password"
                onChange={onConfirmPasswordChange}
                type="password"
              />
            </div>
            <Button onClick={onButtonClick}>Done</Button>
          </div>
        </div>
      </div>
    </div>
    </Wrapper>
  );
}

export default Password;