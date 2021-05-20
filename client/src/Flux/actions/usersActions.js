import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  GETTING_ALL_USERS,
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  UPDATING_FOLLOW,
  ADD_FOLLOWERS,
  REMOVE_FOLLOWERS,
  ADD_FOLLOWING,
  REMOVE_FOLLOWING,
  UPDATE_FOLLOW_ERROR,
  CHANGE_SETTINGS,
} from "./types";
import axios from "axios";
import { getErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

export const loadUser = (userId) => (dispatch, getState) => {
  //User loading
  dispatch({ type: USER_LOADING });

  axios
    .get(`/api/users/${userId}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response) {
        dispatch(getErrors(err.response.data, err.response.status));
        dispatch({
          type: AUTH_ERROR,
        });
      }
    });
};

export const getAllUsers = () => (dispatch, getState) => {
  //User loading
  dispatch({ type: GETTING_ALL_USERS });

  axios
    .get("/api/users", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response) {
        dispatch(getErrors(err.response.data, err.response.status));
        dispatch({
          type: GET_ALL_USERS_ERROR,
        });
      }
    });
};

export const addFollowing = (userId, followingName, followingId) => (
  dispatch,
  getState
) => {
  dispatch({
    type: UPDATING_FOLLOW,
  });
  const body = JSON.stringify({ followingName, followingId });

  axios
    .patch(`/api/users/followings/${userId}`, body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_FOLLOWING,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response) {
        dispatch(getErrors(err.response.data, err.response.status));
        dispatch({
          type: UPDATE_FOLLOW_ERROR,
        });
      }
    });
};

export const removeFollowing = (userId, unfollowingName, unfollowingId) => (
  dispatch,
  getState
) => {
  dispatch({
    type: UPDATING_FOLLOW,
  });
  const body = JSON.stringify({ unfollowingName, unfollowingId });

  axios
    .patch(`/api/users/unfollowings/${userId}`, body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: REMOVE_FOLLOWING,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response) {
        dispatch(getErrors(err.response.data, err.response.status));
        dispatch({
          type: UPDATE_FOLLOW_ERROR,
        });
      }
    });
};

export const addFollower = (userId, followerName, followerId) => (
  dispatch,
  getState
) => {
  dispatch({
    type: UPDATING_FOLLOW,
  });
  const body = JSON.stringify({ followerName, followerId });

  axios
    .patch(`/api/users/followers/${userId}`, body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_FOLLOWERS,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response) {
        dispatch(getErrors(err.response.data, err.response.status));
        dispatch({
          type: UPDATE_FOLLOW_ERROR,
        });
      }
    });
};

export const removeFollower = (userId, unfollowerName, unfollowerId) => (
  dispatch,
  getState
) => {
  dispatch({
    type: UPDATING_FOLLOW,
  });

  const body = JSON.stringify({ unfollowerName, unfollowerId });

  axios
    .patch(`/api/users/unfollowers/${userId}`, body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: REMOVE_FOLLOWERS,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response) {
        dispatch(getErrors(err.response.data, err.response.status));
        dispatch({
          type: UPDATE_FOLLOW_ERROR,
        });
      }
    });
};

export const changeSettings = ({
  userId,
  bio,
  email,
  firstName,
  lastName,
  password,
  newPassword,
  type,
}) => (dispatch, getState) => {
  const body = JSON.stringify({
    bio,
    email,
    firstName,
    lastName,
    password,
    newPassword,
  });
  axios
    .post(
      `/api/users/settings/${userId}?type=${type}`,
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: CHANGE_SETTINGS,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "CHANGE_SETTINGS_FAILED"
          )
        );
      }
    });
};
