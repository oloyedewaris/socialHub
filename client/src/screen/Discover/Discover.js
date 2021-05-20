import React, {useEffect} from "react";
import { useDispatch , useSelector} from "react-redux";
import { Button, Table } from "antd";
import Skeleton from "react-loading-skeleton";

import {
  loadUser,
  getAllUsers,
  addFollower,
  addFollowing,
  removeFollower,
  removeFollowing,
} from "../../Flux/actions/usersActions";
import Wrapper from "../../hoc/navWrapper";

const Discover= ()=> {
  const dispatch = useDispatch()

  const allUsers = useSelector(state => state.users.allUsers)
  const authUser = useSelector(state => state.auth.user)
  const currUser = useSelector(state => state.auth.user)
  const allUsersLoading = useSelector(state => state.users.allUsersLoading)

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(loadUser(authUser.id))
    window.scrollTo(0, 0);
  }, [])

  const onAddFollowing = (userId, followingName, followingId) => {
    dispatch(addFollowing(userId, followingName, followingId));
  };

  const onRemoveFollowing = (userId, unfollowingName, unfollowingId) => {
    dispatch(removeFollowing(userId, unfollowingName, unfollowingId))
  };

  const onAddFollower = (userId, followerName, followerId) => {
    dispatch(addFollower(userId, followerName, followerId))
  };

  const onRemoveFollower = (userId, unfollowerName, unfollowerId) => {
    dispatch(removeFollower(userId, unfollowerName, unfollowerId))
  };

    const filteredUsers = allUsers.filter((user) => {
      return user._id !== authUser.id;
    });
    return (
      <Wrapper>
      <div>
        {allUsersLoading ? (
            <Skeleton height={70} count={3} />
        ) : (
          <Table
            className="table"
            style={{ marginBottom: "10vh" }}
            striped
            dark
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, i) => {
                  return (
                    <tr key={i} style={{ overflowWrap: "break-word" }}>
                      <td>{`${user.firstName} ${user.lastName}`}</td>
                      <td>{user.email}</td>
                      <td style={{ textAlign: "center" }}>
                        <Button
                          size="sm"
                          onClick={() => {
                            if (user.followersId.includes(currUser._id)) {
                              //Unfollow Person
                              onRemoveFollower(
                                user._id,
                                `${authUser.firstName} ${authUser.lastName}`,
                                authUser.id
                              );
                              onRemoveFollowing(
                                authUser.id,
                                `${user.firstName} ${user.lastName}`,
                                user._id
                              );
                            } else {
                              //Follow Person
                              onAddFollower(
                                user._id,
                                `${authUser.firstName} ${authUser.lastName}`,
                                authUser.id
                              );
                              onAddFollowing(
                                authUser.id,
                                `${user.firstName} ${user.lastName}`,
                                user._id
                              );
                            }
                          }}
                        >
                          {user.followersId.includes(currUser._id)
                            ? "UnFollow"
                            : "Follow"}
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <h4 className="center m-4">No User yet</h4>
              )}
            </tbody>
          </Table>
        )}
      </div>
      </Wrapper>
    );
  }

const mapStateToProps = (state) => ({
  allUsers: state.users.allUsers,
  authUser: state.auth.user,
  currUser: state.users.getUser,
  allUsersLoading: state.users.allUsersLoading,
});

export default Discover;
