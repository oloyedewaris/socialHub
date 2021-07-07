import React, { useEffect } from "react";
import { Button, List, Avatar, Skeleton, Popconfirm, message } from "antd";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
} from "../../redux/actions/postActions";
import Post from "./Post";
import CreatePosts from "../CreatePosts/CreatePosts";
import Wrapper from "../../hoc/navWrapper";

const PostsFeed = () => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const posts = useSelector(state => state.post.posts);
  const postLoading = useSelector(state => state.post.postLoading);
  const updatingPostLike = useSelector(state => state.post.updatingPostLike);
  const postDeleted = useSelector(state => state.post.postDeleted);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  useEffect(() => {
    if (postDeleted) {
      message.info("Post deleted");
    }
  }, [postDeleted]);

  const onDeletePost = postId => {
    dispatch(deletePost(postId));

  };

  const onLikeClick = ({ postId, userId }) => {
    dispatch(updatePostLikes(postId, "like", userId));
  };

  const onUnlikeClick = ({ postId, userId }) => {
    dispatch(updatePostLikes(postId, "unlike", userId));
  };

  return (
    <div>
      <Wrapper>
        <CreatePosts />
        {postLoading ? (
          <Skeleton active paragraph={{ row: 5 }} />
        ) : (
          <div className="posts-list">
            <h3>Feeds</h3>
            {posts ? (
              posts.length === 0 ? (
                <h3>No post to show, make a post to appear here</h3>
              ) : (
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    pageSize: 8
                  }}
                  dataSource={posts}
                  footer={
                    <div>
                      <b>Next page</b>
                    </div>
                  }
                  renderItem={(post, i) => {
                    return (
                      <List.Item
                        key={i}
                        actions={[
                          <div>
                            {!post.likers.includes(auth.user._id) ? (
                              <Button
                                disabled={updatingPostLike}
                                onClick={() => {
                                  onLikeClick({
                                    postId: post._id,
                                    userId: auth.user._id
                                  });
                                }}
                              >
                                {`${post.likers.length} `}
                                <LikeOutlined />
                              </Button>
                            ) : (
                              <Button
                                disabled={updatingPostLike}
                                onClick={() => {
                                  onUnlikeClick({
                                    postId: post._id,
                                    userId: auth.user._id
                                  });
                                }}
                              >
                                {`${post.likers.length} `}
                                <LikeFilled />
                              </Button>
                            )}
                          </div>,
                          <Button>
                            <Link to={`/post/${post._id}`}>
                              {`${post.comments.length} `}
                              <CommentOutlined />
                            </Link>
                          </Button>
                        ]}
                        extra={
                          auth.user._id === posts[i].author._id ? (
                            <Popconfirm
                              placement="left"
                              title="Are you sure you want to delete this Post"
                              onConfirm={() => onDeletePost(posts[i]._id)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <DeleteTwoTone twoToneColor="red" />
                            </Popconfirm>
                          ) : null
                        }
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              style={{
                                backgroundColor: post.author.avatarColor
                              }}
                            >
                              {post.author.firstName[0]}
                            </Avatar>
                          }
                          title={`${post.author.firstName} ${post.author.lastName}`}
                          description={timeAgo.format(post.postedTime)}
                        ></List.Item.Meta>
                        {post.text}
                      </List.Item>
                    );
                  }}
                />
              )
            ) : null}
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default PostsFeed;
