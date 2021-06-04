import React from "react";
import { Comment, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTwoTone } from "@ant-design/icons";
import { deleteComment } from "../../Flux/actions/postActions";

const Comments = ({ post }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const onDeleteComment = (postId, commentId, action) => {
    dispatch(deleteComment(postId, commentId, action));
  };

  return (
    <List
      className="comment-list"
      header={`${post.comments.length} replies`}
      itemLayout="horizontal"
      dataSource={post.comments}
      renderItem={(comment, index) => (
        <li key={index}>
          <Comment
            actions={[
              auth.user._id === post.author._id ? (
                <DeleteTwoTone
                  onClick={() =>
                    onDeleteComment(post._id, comment._id, "deleteComment")
                  }
                  twoToneColor="red"
                />
              ) : null
            ]}
            author={`${comment.commenter.firstName} ${comment.commenter.lastName}`}
            avatar={null}
            content={comment.text}
            datetime={null}
          />
        </li>
      )}
    />
  );
};

export default Comments;
