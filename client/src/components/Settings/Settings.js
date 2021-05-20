import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Wrapper from "../../hoc/navWrapper";

function Settings() {
  const firstName = useSelector(state => state.auth.user.firstName);
  const lastName = useSelector(state => state.auth.user.lastName);
  const email = useSelector(state => state.auth.user.email);
  const bio = useSelector(state => state.auth.user.bio);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
    <div>
      <div style={{ margin: "10px" }}>
        <Link to="/profile">
          <ArrowLeftOutlined style={{ color: "black", fontSize: "1.5rem" }} />
        </Link>
      </div>
      <div>
        <div>
          <div>
            <div>Name</div>
            <div>{`${firstName} ${lastName}`}</div>
            <Button size="sm">
              <Link to="/profile/settings/name">Edit</Link>
            </Button>
          </div>
          <div>
            <div>Email Address</div>
            <div>{email}</div>
            <Button size="sm">
              <Link to="/profile/settings/email">Edit</Link>
            </Button>
          </div>
          <div>
            <div>Bio</div>
            <div>{bio}</div>
            <Button size="sm">
              <Link to="/profile/settings/bio">Edit</Link>
            </Button>
          </div>
          <div>
            <div>Password</div>
            <div>
              <h6>
                If you feel someone else's got your password, you can change it
                below
              </h6>
            </div>
            <Button size="sm">
              <Link to="/profile/settings/password">Change Password</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
    </Wrapper>
  );
}

export default Settings;
