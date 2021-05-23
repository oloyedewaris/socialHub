import React, { useState, useEffect } from "react";
import { Button, List, Avatar, Skeleton } from "antd";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useSelector, useDispatch } from "react-redux";
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
            <Skeleton active paragraph={{ row: 5 }} />
          ) : (
            <div classsName="posts-list">
              {posts ? (
                posts.length === 0 ? (
                  <h3>No post to show, make a post to appear here</h3>
                ) : (
                  <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                      pageSize: 5
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
                          <div>
                            {!post.likersId.includes(auth.user._id) ? (
                              <Button
                                disabled={updatingPostLike}
                                onClick={() => {
                                  onLikeClick(
                                    post._id,
                                    `${auth.user.firstName} ${auth.user.lastName}`,
                                    auth.user._id
                                  );
                                }}
                              >
                                {`${post.likers.length} `}
                                <LikeOutlined />
                              </Button>
                            ) : (
                              <Button
                                disabled={updatingPostLike}
                                onClick={() => {
                                  onUnlikeClick(
                                    post._id,
                                    `${auth.user.firstName} ${auth.user.lastName}`,
                                    auth.user._id
                                  );
                                }}
                              >
                                {`${post.likers.length} `}
                                <LikeFilled />
                              </Button>
                            )}
                          </div>,
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
                          auth.user._id === posts[i].authorId ? (
                            <DeleteTwoTone
                              onClick={() => onDeletePost(posts[i]._id)}
                              twoToneColor="red"
                            />
                          ) : null
                        }
                      >
                        <List.Item.Meta
                          avatar={<Avatar>{post.author[0]}</Avatar>}
                          title={post.author}
                          description={timeAgo.format(post.postedTime)}
                        ></List.Item.Meta>
                        {post.text}
                      </List.Item>
                    )}
                  />
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
