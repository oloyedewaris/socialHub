import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { List, Avatar, Button } from "antd";
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
} from "../../Flux/actions/postActions";

const ProfileFeeds = ({ setroute, setcommentIndex }) => {
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
            <Button
              onClick={() => {
                setroute("comments");
                setcommentIndex(i);
              }}
            >
              {`${post.comments.length} `}
              <CommentOutlined />
            </Button>
          ]}
          extra={
            <DeleteTwoTone
              onClick={() => onDeletePost(post._id)}
              twoToneColor="red"
            />
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
  );
};

export default ProfileFeeds;
