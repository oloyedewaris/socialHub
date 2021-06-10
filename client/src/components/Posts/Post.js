import React, { useState, useEffect } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { List, Button, Avatar, Spin } from "antd";
import Wrapper from "../../hoc/navWrapper";
import { LikeOutlined, CommentOutlined, LikeFilled } from "@ant-design/icons";
import { updatePostLikes, getPosts } from "../../redux/actions/postActions";
import Comments from "./Comments";
import CommentInput from "./CommentInput";

const Post = props => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const dispatch = useDispatch();
  const updatingPostLike = useSelector(state => state.post.updatingPostLike);
  const posts = useSelector(state => state.post.posts);
  const auth = useSelector(state => state.auth);
  const [post, setpost] = useState(null);
  const postId = useParams().id;

  useEffect(() => {
    dispatch(getPosts());
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (posts) {
      posts.forEach(post => {
        if (post._id === postId) {
          setpost(post);
        }
      });
    }
  }, [posts]);

  const onLikeClick = (postId, userId) => {
    dispatch(updatePostLikes(postId, "like", userId));
  };

  const onUnlikeClick = (postId, userId) => {
    dispatch(updatePostLikes(postId, "unlike", userId));
  };

  return (
    <Wrapper>
      {post ? (
        <div className="posts-comment">
          <List
            dataSource={["1"]}
            renderItem={() => (
              <List.Item
                actions={[
                  !post.likers.includes(auth.user._id) ? (
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
                  ),
                  <Button>
                    {`${post.comments.length} `}
                    <CommentOutlined />
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{ backgroundColor: post.author.avatarColor }}
                    >
                      {post.author.firstName[0]}
                    </Avatar>
                  }
                  title={`${post.author.firstName} ${post.author.lastName}`}
                  description={timeAgo.format(post.postedTime)}
                />
                {post.text}
              </List.Item>
            )}
          />
          <div>
            <Comments post={post} />
          </div>
          <CommentInput
            postData={{
              commentId: post._id,
              userId: auth.user._id
            }}
          />
        </div>
      ) : (
        <div className="loader">
          <Spin size="large" />
        </div>
      )}
    </Wrapper>
  );
};

export default Post;
