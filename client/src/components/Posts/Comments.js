import React from "react";
import { Comment, List, Popconfirm, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTwoTone } from "@ant-design/icons";
import { deleteComment } from "../../Flux/actions/postActions";

const Comments = ({ post }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const onDeleteComment = (postId, commentId, action) => {
    dispatch(deleteComment(postId, commentId, action));
    message("Comment deleted");
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
                <Popconfirm
                  placement="right"
                  title="Are you sure you want to delete this Comment"
                  onConfirm={() =>
                    onDeleteComment(post._id, comment._id, "deleteComment")
                  }
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteTwoTone twoToneColor="red" />
                </Popconfirm>
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
