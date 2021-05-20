import React from "react";
import { connect } from "react-redux";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {
  Row,
  Col,
  Button,
} from "antd";
import {
  LikeFilled,
  LikeOutlined,
  CommentOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  getPosts,
  updatePostLikes,
  createPost,
  deletePost,
} from "../../Flux/actions/postActions";
import { loadUser } from "../../Flux/actions/usersActions";
import Post from "../Posts/Post";
import CreatePosts from "../CreatePosts/CreatePosts";
import Wrapper from "../../hoc/navWrapper";

class FullProfile extends React.Component {
  state = {
    route: null,
    commentIndex: "",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    this.props.getPosts();
    this.props.loadUser(this.props.auth.user.id);
  }

  onLikeClick = (postId, user, userId) => {
    this.props.updatePostLikes(postId, "like", user, userId);
  };

  onUnlikeClick = (postId, user, userId) => {
    this.props.updatePostLikes(postId, "unlike", user, userId);
  };

  onDeletePost = (postId) => {
    this.props.deletePost(postId);
  };

  render() {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");

    var filteredPost;
    const { posts } = this.props;
    const { auth } = this.props;
    const { user } = this.props.auth;
    const { currUser } = this.props;
    if (posts) {
      filteredPost = posts.filter((post) => {
        return user.id === post.authorId;
      });
    }
    const updatingPostLike = this.props.updatingPostLike;
    return (
      <Wrapper>
      <div>
        <div>
          {this.state.route === "comments" ? (
            <Post
              commingFrom="/profile"
              commentIndex={this.state.commentIndex}
            />
          ) : (
            <div>
              <div className="m-3 mx-auto rounded-lg full-profile">
                {user ? (
                  <div className="m-auto my-auto">
                    <h4 className="profile-name">{`${user.firstName} ${user.lastName}`}</h4>
                    <h4 className="profile-email">{`${user.email}`}</h4>
                  </div>
                ) : null}
              </div>
              <div flush>
                <div className="pl-4">
                  First Name: {`${user.firstName}`}
                </div>
                <div className="pl-4">
                  Last Name: {`${user.lastName}`}
                </div>
                <div className="pl-4">
                  E-mail: {`${user.email}`}
                </div>
                {user.bio ? (
                  <div className="pl-4">
                    Bio: {`${user.bio}`}
                  </div>
                ) : null}
                <div className="pl-4">
                  Joined at: {`${user.registeredAt}`}
                </div>
                <div className="pl-4">
                  <Button outline color="primary">
                    <Link style={{ color: "black" }} to="/profile/settings">
                      Edit Profile
                    </Link>
                  </Button>
                </div>
                <div style={{ margin: "0 10px" }}>
                  <Row>
                    <Col xs="6" sm="3" md="2" lg="2">
                      <Button
                        className="m-1 p-1"
                        onClick={() => {
                          this.setState({ route: "follow" });
                        }}
                      >
                        <Link style={{ color: "black" }} to="/follow">
                          {currUser.followersId
                            ? `${currUser.followersId.length} `
                            : null}
                          Followers
                        </Link>
                      </Button>
                    </Col>
                    <Col xs="6" sm="3" md="2" lg="2">
                      <Button
                        className="m-1 p-1"
                        onClick={() => {
                          this.setState({ route: "follow" });
                        }}
                      >
                        <Link style={{ color: "black" }} to="/follow">
                          {currUser.followersId
                            ? `${currUser.followingId.length} `
                            : null}
                          Following
                        </Link>
                      </Button>
                    </Col>
                    <Col
                      style={{ marginBottom: "40px", marginTop: "10px" }}
                      xs="12"
                      sm="6"
                      md="8"
                      lg="8"
                    >
                      <Button
                        className="post-delete"
                        onClick={() => {
                          this.setState({ route: "discover" });
                        }}
                      >
                        <Link style={{ color: "black" }} to="/discover">
                          Discover More
                        </Link>
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#E9ECEF",
                  marginBottom: "10vh",
                }}
                className=" mt-3 pt-3 border border-bottom-0 border-right-0 border-left-0"
              >
                <div>
                  <CreatePosts />
                </div>
                <div>
                  {filteredPost && auth.user.id ? (
                    filteredPost.length === 0 ? (
                      <div>
                        <h3 className="center pt-2">
                          You have not made any post yet
                        </h3>
                      </div>
                    ) : (
                      filteredPost.map((post, i) => {
                        return (
                          <div key={i}>
                            <div className="mr-3 ml-3 pr-1 pl-1 feeds">
                              <h4 className="author">{post.author}</h4>
                              <h6 className="text">{post.text}</h6>
                              {!filteredPost[i].likersId.includes(
                                auth.user.id
                              ) ? (
                                <Button
                                  disabled={updatingPostLike}
                                  onClick={() => {
                                    this.onLikeClick(
                                      post._id,
                                      `${auth.user.firstName} ${auth.user.lastName}`,
                                      auth.user.id
                                    );
                                  }}
                                  size="sm"
                                  style={{ margin: "2px" }}
                                >
                                  {`${post.likesCount} `}
                                  <LikeOutlined
                                    style={{
                                      margin: "5px",
                                      fontSize: "1.5rem",
                                    }}
                                  />
                                </Button>
                              ) : (
                                <Button
                                  disabled={updatingPostLike}
                                  onClick={() => {
                                    this.onUnlikeClick(
                                      post._id,
                                      `${auth.user.firstName} ${auth.user.lastName}`,
                                      auth.user.id
                                    );
                                  }}
                                  size="sm"
                                  style={{ margin: "2px" }}
                                >
                                  {`${post.likesCount} `}
                                  <LikeFilled
                                    style={{
                                      margin: "5px",
                                      fontSize: "1.5rem",
                                    }}
                                  />
                                </Button>
                              )}
                              <Button
                                style={{
                                  position: "absolute",
                                  margin: "2px",
                                }}
                                size="sm"
                                onClick={() => {
                                  this.setState({
                                    route: "comments",
                                    commentIndex: i,
                                  });
                                }}
                              >
                                {`${post.comments.length} `}
                                <CommentOutlined
                                  style={{
                                    margin: "5px",
                                    fontSize: "1.5rem",
                                  }}
                                />
                              </Button>
                              <DeleteTwoTone
                                className="post-delete"
                                onClick={() => this.onDeletePost(post._id)}
                                style={{
                                  margin: "5px",
                                  fontSize: "1.5rem",
                                }}
                                twoToneColor="red"
                              />
                              <p>{timeAgo.format(post.postedTime)}</p>
                            </div>
                          </div>
                        );
                      })
                    )
                  ) : (
                    <h3 className="center pt-2">
                      You have not made any post yet
                    </h3>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.post.posts,
  updatingPostLike: state.post.updatingPostLike,
  currUser: state.users.getUser,
});

export default connect(mapStateToProps, {
  deletePost,
  loadUser,
  getPosts,
  updatePostLikes,
  createPost,
})(FullProfile);
