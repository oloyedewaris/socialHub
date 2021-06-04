import {
  GETTING_ALL_USERS,
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  UPDATING_FOLLOW,
  ADD_FOLLOWERS,
  REMOVE_FOLLOWERS,
  ADD_FOLLOWING,
  REMOVE_FOLLOWING,
  UPDATE_FOLLOW_ERROR
} from "./types";
import axios from "axios";
import { getErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

export const getAllUsers = () => (dispatch, getState) => {
  //User loading
  dispatch({ type: GETTING_ALL_USERS });

  axios
    .get("/api/users", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response) {
        dispatch(getErrors(err.response.data, err.response.status));
        dispatch({
          type: GET_ALL_USERS_ERROR
        });
      }
    });
};

export const addFollowing = ({ userId, followingId }) => (
  dispatch,
  getState
) => {
  dispatch({
    type: UPDATING_FOLLOW
  });
  const body = JSON.stringify({ followingId });

  axios
    .patch(`/api/users/followings/${userId}`, body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_FOLLOWING,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response) {
        dispatch(getErrors(err.response.data, err.response.status));
        dispatch({
          type: UPDATE_FOLLOW_ERROR
        });
      }
    });
};

export const removeFollowing = ({ userId, unfollowingId }) => (
  dispatch,
  getState
) => {
  dispatch({
    type: UPDATING_FOLLOW
  });
  const body = JSON.stringify({ unfollowingId });

  axios
    .patch(`/api/users/unfollowings/${userId}`, body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: REMOVE_FOLLOWING,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response) {
        dispatch(getErrors(err.response.data, err.response.status));
        dispatch({
          type: UPDATE_FOLLOW_ERROR
        });
      }
    });
};

export const addFollower = ({ userId, followerId }) => (dispatch, getState) => {
  dispatch({
    type: UPDATING_FOLLOW
  });
  const body = JSON.stringify({ followerId });

  axios
    .patch(`/api/users/followers/${userId}`, body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_FOLLOWERS,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response) {
        dispatch(getErrors(err.response.data, err.response.status));
        dispatch({
          type: UPDATE_FOLLOW_ERROR
        });
      }
    });
};

export const removeFollower = ({ userId, unfollowerId }) => (
  dispatch,
  getState
) => {
  dispatch({
    type: UPDATING_FOLLOW
  });

  const body = JSON.stringify({ unfollowerId });

  axios
    .patch(`/api/users/unfollowers/${userId}`, body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: REMOVE_FOLLOWERS,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response) {
        dispatch(getErrors(err.response.data, err.response.status));
        dispatch({
          type: UPDATE_FOLLOW_ERROR
        });
      }
    });
};
