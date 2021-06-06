import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, List } from "antd";
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
      <div style={{ margin: 15 }}>
        <List direction="vertical">
          <List.Item>
            <div>Name</div>
            <div>{`${firstName} ${lastName}`}</div>
            <Button size="sm">
              <Link to="/profile/settings/name">Edit</Link>
            </Button>
          </List.Item>
          <List.Item>
            <div>Email Address</div>
            <div>{email}</div>
            <Button size="sm">
              <Link to="/profile/settings/email">Edit</Link>
            </Button>
          </List.Item>
          <List.Item>
            <div>Bio</div>
            <div>{bio}</div>
            <Button size="sm">
              <Link to="/profile/settings/bio">Edit</Link>
            </Button>
          </List.Item>
          <List.Item>
            <div>Password</div>
            <div>
              <h4>
                If you feel someone else's got your password, you can change it
                below
              </h4>
            </div>
            <Button size="sm">
              <Link to="/profile/settings/password">Change Password</Link>
            </Button>
          </List.Item>
        </List>
      </div>
    </Wrapper>
  );
}

export default Settings;
