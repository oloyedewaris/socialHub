import React, { useState, useEffect } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button } from "antd";
import {
  LikeOutlined,
  CommentOutlined,
  LikeFilled,
  ArrowLeftOutlined
} from "@ant-design/icons";
import { updatePostLikes } from "../../Flux/actions/postActions";
import FullProfile from "../Profile/FullProfile";
import PostsFeed from "./PostsFeed";
import Comments from "./Comments";
import CommentInput from "./CommentInput";

const Post = props => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.posts);
  const updatingPostLike = useSelector(state => state.post.updatingPostLike);
  const auth = useSelector(state => state.auth);
  const [Route, setRoute] = useState("comment");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onLikeClick = (postId, user, userId) => {
    dispatch(updatePostLikes(postId, "like", user, userId));
  };

  const onUnlikeClick = (postId, user, userId) => {
    dispatch(updatePostLikes(postId, "unlike", user, userId));
  };

  const i = props.commentIndex;

  return (
    <div>
      {Route === "comment" ? (
        <div>
          <div style={{ margin: "10px" }}>
            <ArrowLeftOutlined
              onClick={() => setRoute(props.commingFrom)}
              style={{ fontSize: "1.5rem" }}
            />{" "}
            back
          </div>
          <h3>{posts[i].author}</h3>
          <h6>{posts[i].text}</h6>
          <span>
            {!posts[i].likersId.includes(auth.user.id) ? (
              <Button
                disabled={updatingPostLike}
                onClick={() => {
                  onLikeClick(
                    posts[i]._id,
                    `${auth.user.firstName} ${auth.user.lastName}`,
                    auth.user.id
                  );
                }}
                size="sm"
                style={{ margin: "2px" }}
              >
                {`${posts[i].likesCount} `}
                <LikeOutlined style={{ margin: "5px", fontSize: "1.5rem" }} />
              </Button>
            ) : (
              <Button
                disabled={updatingPostLike}
                onClick={() => {
                  onUnlikeClick(
                    posts[i]._id,
                    `${auth.user.firstName} ${auth.user.lastName}`,
                    auth.user.id
                  );
                }}
                size="sm"
                style={{ margin: "2px" }}
              >
                {`${posts[i].likesCount} `}
                <LikeFilled style={{ margin: "5px", fontSize: "1.5rem" }} />
              </Button>
            )}
          </span>
          <Button
            style={{
              position: "absolute",
              margin: "2px"
            }}
            size="sm"
          >
            {`${posts[i].comments.length} `}
            <CommentOutlined style={{ margin: "5px", fontSize: "1.5rem" }} />
          </Button>
          <p>{timeAgo.format(posts[i].postedTime)}</p>
          <div>
            <Comments post={posts[i]} />
          </div>
          <CommentInput
            postData={{
              commenter: `${auth.user.firstName} ${auth.user.lastName}`,
              commentId: posts[i]._id,
              userId: auth.user.id
            }}
          />
        </div>
      ) : Route === "/profile" ? (
        <FullProfile />
      ) : Route === "/home" ? (
        <PostsFeed />
      ) : null}
    </div>
  );
};

export default Post;
