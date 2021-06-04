import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Avatar, Skeleton } from "antd";
import {
  getAllUsers,
  addFollower,
  addFollowing,
  removeFollower,
  removeFollowing
} from "../../Flux/actions/usersActions";
import Wrapper from "../../hoc/navWrapper";

const Discover = () => {
  const { Meta } = Card;
  const dispatch = useDispatch();

  const allUsers = useSelector(state => state.users.allUsers);
  const authUser = useSelector(state => state.auth.user);
  const allUsersLoading = useSelector(state => state.users.allUsersLoading);

  useEffect(() => {
    dispatch(getAllUsers());
    window.scrollTo(0, 0);
  }, []);

  const onAddFollowing = ({ userId, followingId }) => {
    dispatch(addFollowing({ userId, followingId }));
  };

  const onRemoveFollowing = ({ userId, unfollowingId }) => {
    dispatch(removeFollowing({ userId, unfollowingId }));
  };

  const onAddFollower = ({ userId, followerId }) => {
    dispatch(addFollower({ userId, followerId }));
  };

  const onRemoveFollower = ({ userId, unfollowerId }) => {
    dispatch(removeFollower({ userId, unfollowerId }));
  };

  return (
    <Wrapper>
      <div>
        {allUsersLoading ? (
          <Skeleton avatar paragraph={{ row: 4 }} active />
        ) : (
          <div className="discovered-container">
            {allUsers.length > 0 ? (
              allUsers.map((user, i) => (
                <div key={i} style={{ margin: 10 }}>
                  <Card
                    className="center-card"
                    hoverable
                    cover={
                      <Avatar
                        style={{ backgroundColor: user.avatarColor }}
                        className="center-avatar center"
                        size={70}
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
                  {user.followersId.find(user => user._id === authUser._id) ? (
                    <Button
                      size="medium"
                      type="ghost"
                      disabled={allUsersLoading}
                      onClick={() => {
                        onRemoveFollower({
                          userId: user._id,
                          unfollowerId: authUser._id
                        });
                        onRemoveFollowing({
                          userId: authUser._id,
                          unfollowingId: user._id
                        });
                      }}
                    >
                      UnFollow
                    </Button>
                  ) : (
                    <Button
                      size="large"
                      type="primary"
                      disabled={allUsersLoading}
                      onClick={() => {
                        onAddFollower({
                          userId: user._id,
                          followerId: authUser._id
                        });
                        onAddFollowing({
                          userId: authUser._id,
                          followingId: user._id
                        });
                      }}
                    >
                      Follow
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <h4 className="center">No User yet</h4>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Discover;
