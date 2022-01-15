import React, { useEffect } from "react";
import { Button, List, Avatar, Skeleton, Popconfirm, message, Space } from "antd";
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
import CreatePosts from "../../components/CreatePosts/CreatePosts";

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

  const onDeletePost = postId =>
    dispatch(deletePost(postId));

  const onLikeClick = ({ postId, userId }) =>
    dispatch(updatePostLikes(postId, "like", userId));


  const onUnlikeClick = ({ postId, userId }) =>
    dispatch(updatePostLikes(postId, "unlike", userId));

  const IconText = ({ icon, text, ...props }) => (
    <Space {...props}>
      {React.createElement(icon)}
      {text}
    </Space>
  )

  return (
    <div>
      <div>
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
                  pagination={{ pageSize: 5 }}
                  dataSource={posts}
                  renderItem={(post, i) => {
                    return (
                      <List.Item
                        key={i}
                        actions={[
                          <IconText
                            disabled={updatingPostLike}
                            onClick={() => !post.likers.includes(auth.user._id) ?
                              onLikeClick({ postId: post._id, userId: auth.user._id }) :
                              onUnlikeClick({ postId: post._id, userId: auth.user._id })}
                            text={`${post.likers.length} `}
                            icon={!post.likers.includes(auth.user._id) ? LikeOutlined : LikeFilled}
                          />,
                          <Link to={`/post/${post._id}`}>
                            {`${post.comments.length} `}
                            <CommentOutlined />
                          </Link>
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
                            <Avatar style={{ backgroundColor: post.author.avatarColor }}>
                              {post.author.firstName[0]}
                            </Avatar>
                          }
                          title={`${post.author.firstName} ${post.author.lastName}`}
                          description={timeAgo.format(post.postedTime)}
                        />
                        {post.text}
                      </List.Item>
                    );
                  }}
                />
              )
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsFeed;
