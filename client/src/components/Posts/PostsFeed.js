import React, { useState, useEffect } from "react";
import { Button, List, Avatar, Space } from "antd";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import {
  LikeOutlined,
  LikeFilled,
  CommentOutlined,
  DeleteTwoTone
} from "@ant-design/icons";
import {
  getPosts,
  updatePostLikes,
  deletePost
} from "../../Flux/actions/postActions";
import Post from "./Post";
import CreatePosts from "../CreatePosts/CreatePosts";

const PostsFeed = () => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const posts = useSelector(state => state.post.posts);
  const postLoading = useSelector(state => state.post.postLoading);
  const updatingPostLike = useSelector(state => state.post.updatingPostLike);
  const [Route, setRoute] = useState(null);
  const [CommentIndex, setCommentIndex] = useState("");

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const onDeletePost = postId => {
    dispatch(deletePost(postId));
  };

  const onLikeClick = (postId, user, userId) => {
    dispatch(updatePostLikes(postId, "like", user, userId));
  };

  const onUnlikeClick = (postId, user, userId) => {
    dispatch(updatePostLikes(postId, "unlike", user, userId));
  };

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <div
      style={{
        backgroundColor: "#E9ECEF",
        marginBottom: "10vh"
      }}
    >
      {Route === "comments" ? (
        <Post commingFrom="/home" commentIndex={CommentIndex} />
      ) : (
        <div>
          <CreatePosts />
          {postLoading ? (
            <Skeleton height={70} count={2} />
          ) : (
            <div style={{ marginBottom: "20px" }}>
              {posts ? (
                posts.length === 0 ? (
                  <h3>No post to show, make a post to appear here</h3>
                ) : (
                  <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                      onChange: page => console.log(page),
                      pageSize: 3
                    }}
                    dataSource={posts}
                    footer={
                      <div>
                        <b>Next page</b>
                      </div>
                    }
                    renderItem={(post, i) => (
                      <List.Item
                        key={i}
                        actions={[
                          !posts[i].likersId.includes(auth.user.id) ? (
                            <Button
                              disabled={updatingPostLike}
                              onClick={() => {
                                console.log(posts);
                                onLikeClick(
                                  post._id,
                                  `${auth.user.firstName} ${auth.user.lastName}`,
                                  auth.user.id
                                );
                              }}
                            >
                              {`${post.likesCount} `}
                              <LikeOutlined />
                            </Button>
                          ) : (
                            <Button
                              disabled={updatingPostLike}
                              onClick={() => {
                                onUnlikeClick(
                                  post._id,
                                  `${auth.user.firstName} ${auth.user.lastName}`,
                                  auth.user.id
                                );
                              }}
                            >
                              {`${post.likesCount} `}
                              <LikeFilled />
                            </Button>
                          ),
                          <Button
                            onClick={() => {
                              setRoute("comments");
                              setCommentIndex(i);
                            }}
                          >
                            {`${post.comments.length} `}
                            <CommentOutlined />
                          </Button>
                        ]}
                        extra={
                          auth.user.id === posts[i].authorId ? (
                            <DeleteTwoTone
                              onClick={() => onDeletePost(posts[i]._id)}
                              twoToneColor="red"
                            />
                          ) : null
                        }
                      >
                        <List.Item.Meta
                          avater={<Avatar />}
                          title={post.author}
                          description={timeAgo.format(post.postedTime)}
                        ></List.Item.Meta>
                        {post.text}
                      </List.Item>
                    )}
                  ></List>
                )
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostsFeed;
