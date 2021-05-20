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

function Email() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.user.email);
  const userId = useSelector((state) => state.auth.user.id);
  const error = useSelector((state) => state.error);
  const [Error, setError] = useState(null);
  const [Email, setEmail] = useState(email);
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

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    setError(null);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setError(null);
  };

  const onButtonClick = () => {
    const newUpdate = {
      userId,
      email: Email,
      password: Password,
      type: "dataChange",
    };

    dispatch(changeSettings(newUpdate));
  };

  return (
    <Wrapper>
    <div>
      <div style={{ margin: "10px" }}>
        <Link to="/profile/settings">
          <ArrowLeftOutlined style={{ color: "black", fontSize: "1.5rem" }} />
        </Link>
      </div>
      {Error ? (
        <Alert className="m-3 alert alert-danger  mb-0">{Error}</Alert>
      ) : null}
      <div>
        <div>
          <div>
            <div>Edit Email</div>
            <div>
              <Input type="text" onChange={onEmailChange} value={Email} />
            </div>
          </div>
          <div>
            <div>Enter Password</div>
            <div>
              <Input
                type="password"
                onChange={onPasswordChange}
                value={Password}
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

export default Email;
