import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, List, Modal } from "antd";
import Name from "./Sections/Name";
import Email from "./Sections/Email";
import Password from "./Sections/Password";
import Bio from "./Sections/Bio";

function Settings() {
  const [component, setComponent] = useState(null)
  const [toggle, setToggle] = useState(false)

  const firstName = useSelector(state => state.auth.user.firstName);
  const lastName = useSelector(state => state.auth.user.lastName);
  const email = useSelector(state => state.auth.user.email);
  const bio = useSelector(state => state.auth.user.bio);
  const error = useSelector(state => state.error);

  return (
    <div style={{ margin: 15 }}>
      <List direction="vertical">
        <List.Item><div>Name</div><div>{`${firstName} ${lastName}`}</div>
          <Button onClick={() => { setComponent(<Name />); setToggle(true) }} size="sm">Edit</Button>
        </List.Item>
        <List.Item><div>Email Address</div><div>{email}</div>
          <Button onClick={() => { setComponent(<Email />); setToggle(true) }} size="sm">Edit</Button>
        </List.Item>
        <List.Item><div>Bio</div><div>{bio}</div><Button onClick={() => { setComponent(<Bio />); setToggle(true) }} size="sm">Edit</Button>
        </List.Item>
        <List.Item><div>Password</div><h5>If you feel someone else's got your password, you can change it below</h5>
          <Button onClick={() => { setComponent(<Password />); setToggle(true) }} size="sm">Change Password</Button>
        </List.Item>
      </List>
      <Modal title="Edit data" visible={toggle} onCancel={() => setToggle(false)}>
        {component}
      </Modal>
    </div>
  );
}

export default Settings;
