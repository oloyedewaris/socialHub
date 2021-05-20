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

function Bio(props) {
  const dispatch = useDispatch();
  const bio = useSelector((state) => state.auth.user.bio);
  const userId = useSelector((state) => state.auth.user.id);
  const error = useSelector((state) => state.error);
  const [Error, setError] = useState(null);
  const [Bio, setBio] = useState(bio);
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

  const onBioChange = (e) => {
    setBio(e.target.value);
    setError(null);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setError(null);
  };

  const onButtonClick = () => {
    const newUpdate = {
      userId,
      bio: Bio,
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
        <Alert mesage={Error}/>
      ) : null}
      <div>
        <div>
          <div>
            <div>Edit Bio</div>
            <div>
              <Input type="text" onChange={onBioChange} value={Bio} />
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

export default Bio;
