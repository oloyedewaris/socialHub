import React, { useState } from "react";
import { Input, Space, Alert } from "antd";
import { useDispatch } from "react-redux";
import { addComment } from "../../redux/actions/postActions";

const { Search } = Input;
const CommentInput = ({ postData }) => {
  const [Comment, setComment] = useState("");
  const [Error, setError] = useState(null);

  const dispatch = useDispatch();

  const { userId, commentId } = postData;

  const onInputChange = e => {
    setComment(e.target.value);
    setError(null);
  };

  const onAddComment = (postId, action, commenterId, text) => {
    if (Comment !== "") {
      dispatch(addComment(postId, action, commenterId, text));
    } else {
      setError("Please enter a text to comment");
    }
    setComment("");
  };

  return (
    <div>
      {Error ? (
        <Alert
          className="alert"
          message={Error > 50 ? "Internal Server Error" : Error}
          type="error"
          showIcon
          closable
        />
      ) : null}
      <Space direction="vertical">
        <Search
          value={Comment}
          placeholder="Enter a comment"
          onChange={onInputChange}
          size="large"
          enterButton="Comment"
          onSearch={() =>
            onAddComment(commentId, "addComment", userId, Comment)
          }
        />
      </Space>
    </div>
  );
};

export default CommentInput;
