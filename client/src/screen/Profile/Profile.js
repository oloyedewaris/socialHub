import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Button } from "antd";
import { Link } from "react-router-dom";
import CreatePosts from "../../components/CreatePosts/CreatePosts";
import Wrapper from "../../hoc/navWrapper";
import ProfileFeeds from "./ProfileFeeds";

const Profile = () => {
  const user = useSelector(state => state.auth.user);

  const { Meta } = Card;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      <div>
        <div>
          {user ? (
            <Card
              className="center-card center"
              hoverable
              cover={
                <Avatar
                  style={{ backgroundColor: user.avatarColor }}
                  className="center-avatar center"
                  size={80}
                >
                  {user.firstName[0]}
                </Avatar>
              }
            >
              <Meta
                title={`${user.firstName} ${user.lastName}`}
                description={user.email}
              />
            </Card>
          ) : null}
        </div>
        <Card title="Profile" size="default">
          <p>First Name: {`${user.firstName}`}</p>
          <p>Last Name: {`${user.lastName}`}</p>
          <p>E-mail: {`${user.email}`}</p>
          {user.bio ? <p>Bio: {`${user.bio}`}</p> : null}
          <p>Joined at: {`${user.registeredAt}`}</p>
        </Card>
        <Card
          type="inner"
          extra={
            <Button>
              <Link to="/discover">Discover More</Link>
            </Button>
          }
        >
          <p>
            <Button>
              <Link to="/profile/settings">Edit Profile</Link>
            </Button>
          </p>
          <p>
            <Button>
              <Link to="/follow">
                {user.followersId ? `${user.followersId.length} ` : null}
                Followers
              </Link>
            </Button>
          </p>
          <p>
            <Button>
              <Link to="/follow">
                {user.followersId ? `${user.followingId.length} ` : null}
                Following
              </Link>
            </Button>
          </p>
        </Card>
        <div>
          <CreatePosts />
          <ProfileFeeds />
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;
