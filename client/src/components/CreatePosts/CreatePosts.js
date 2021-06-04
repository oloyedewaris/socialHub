import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Input } from "antd";
import Loader from "react-loader-spinner";
import { createPost } from "../../Flux/actions/postActions";

function CreatePosts() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const postCreating = useSelector(state => state.post.postCreating);
  const [Error, setError] = useState(null);
  const [Text, setText] = useState("");

  const onInputChange = e => {
    setError(null);
    setText(e.target.value);
  };

  const onCreatePost = () => {
    if (Text !== "") {
      const newPost = {
        text: Text,
        authorId: user._id
      };

      dispatch(createPost(newPost));
    } else {
      setError("Please enter a text to post");
    }

    setText("");
  };

  return (
    <div className="create-post">
      <Input
        type="textarea"
        value={Text}
        placeholder="What's on your mind"
        onChange={onInputChange}
      />
      <Button
        className="post-button"
        size="large"
        type="primary"
        onClick={onCreatePost}
      >
        Post
      </Button>
      {Error ? <Alert type="error" closable message={Error} /> : null}
      {postCreating ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loader type="Rings" color="#00bfff" height={70} width={70} />
          <br />
          <p style={{ margin: "1.5rem" }}>Creating your post</p>
        </div>
      ) : null}
    </div>
  );
}

export default CreatePosts;
