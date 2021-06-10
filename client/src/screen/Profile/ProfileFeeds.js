import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { List, Avatar, Button, Popconfirm, message } from "antd";
import {
  LikeFilled,
  LikeOutlined,
  CommentOutlined,
  DeleteTwoTone
} from "@ant-design/icons";
import {
  getPosts,
  updatePostLikes,
  deletePost
} from "../../redux/actions/postActions";

const ProfileFeeds = () => {
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const dispatch = useDispatch();

  const updatingPostLike = useSelector(state => state.post.updatingPostLike);
  const posts = useSelector(state => state.post.posts);
  const auth = useSelector(state => state.auth);

  const onLikeClick = (postId, userId) => {
    dispatch(updatePostLikes(postId, "like", userId));
  };

  const onUnlikeClick = (postId, userId) => {
    dispatch(updatePostLikes(postId, "unlike", userId));
  };

  const onDeletePost = postId => {
    dispatch(deletePost(postId));
    message.info("Post deleted");
  };

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const { user } = auth;

  var filteredPost;
  if (posts) {
    filteredPost = posts.filter(post => {
      return user._id === post.author._id;
    });
  }

  return (
    <div className="posts-list">
      <h3>Profile Feeds</h3>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 3
        }}
        dataSource={filteredPost}
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
                {!post.likers.includes(auth.user._id) ? (
                  <Button
                    disabled={updatingPostLike}
                    onClick={() => {
                      onLikeClick(post._id, auth.user._id);
                    }}
                  >
                    {`${post.likers.length} `}
                    <LikeOutlined />
                  </Button>
                ) : (
                  <Button
                    disabled={updatingPostLike}
                    onClick={() => {
                      onUnlikeClick(post._id, auth.user._id);
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
              <Popconfirm
                placement="left"
                title="Are you sure you want to delete this Post"
                onConfirm={() => onDeletePost(post._id)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteTwoTone twoToneColor="red" />
              </Popconfirm>
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
            ></List.Item.Meta>
            {post.text}
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProfileFeeds;
