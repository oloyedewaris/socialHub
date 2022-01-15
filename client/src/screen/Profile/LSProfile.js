import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar } from "antd";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const { Meta } = Card;

  return (
    <div>
      {user ? (
        <Card className="center_card" hoverable>
          <p><Avatar className="center-avatar" size={80}> {user.firstName[0]}</Avatar></p>
          <Meta title={`${user.firstName} ${user.lastName}`} description={user.email} />
        </Card>
      ) : null}
      <Card style={{ marginTop: 10 }} className="center_card" title="Profile" size="default">
        <p>First Name: {`${user.firstName}`}</p>
        <p>Last Name: {`${user.lastName}`}</p>
        <p>Email: {user.email}</p>
      </Card>
    </div>
  );
};

export default Profile;
