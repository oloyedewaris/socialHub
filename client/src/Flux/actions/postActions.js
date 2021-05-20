import {
  GET_POSTS,
  GETTING_POSTS,
  GET_POSTS_FAILED,
  CREATE_POST,
  CREATING_POST,
  CREATE_POST_FAILED,
  ADD_COMMENT,
  DELETE_COMMENT,
  DELETE_POST,
  UPDATING_POST_LIKE,
  UPDATE_POST_LIKES,
} from "./types";
import axios from "axios";
import { getErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

export const getPosts = () => (dispatch, getState) => {
  dispatch({
    type: GETTING_POSTS,
  });
  axios
    .get("/api/posts", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response)
        return dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "GETTING_POSTS_FAILED"
          )
        );
      dispatch({
        type: GET_POSTS_FAILED,
      });
    });
};

export const createPost = ({ text, author, authorId }) => (
  dispatch,
  getState
) => {
  dispatch({
    type: CREATING_POST,
  });

  const body = JSON.stringify({ text, author, authorId });

  axios
    .post("/api/posts", body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: CREATE_POST,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response) {
        dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "CREATE_POSTS_FAILED"
          )
        );
        dispatch({
          type: CREATE_POST_FAILED,
        });
      }
    });
};

export const updatePostLikes = (postId, action, user, userId) => (
  dispatch,
  getState
) => {
  dispatch({
    type: UPDATING_POST_LIKE,
  });
  const body = JSON.stringify({ action, user, userId });

  axios
    .patch(`/api/posts/${postId}`, body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: UPDATE_POST_LIKES,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response)
        return dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "UPDATE_POST_LIKES_FAILED"
          )
        );
    });
};

export const addComment = (postId, action, commenter, commenterId, text) => (
  dispatch,
  getState
) => {
  const body = JSON.stringify({ action, commenter, commenterId, text });

  axios
    .patch(`/api/posts/${postId}`, body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response)
        return dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "ADD_COMMENT_FAILED"
          )
        );
    });
};

export const deleteComment = (postId, commentId, action) => (
  dispatch,
  getState
) => {
  const body = JSON.stringify({ action, commentId });

  axios
    .patch(`/api/posts/${postId}`, body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_COMMENT,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response)
        return dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "DELETE_COMMENT_FAILED"
          )
        );
    });
};

export const deletePost = (postId) => (dispatch, getState) => {
  axios
    .delete(`/api/posts/${postId}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_POST,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response)
        return dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "DELETE_POST_FAILED"
          )
        );
    });
};
