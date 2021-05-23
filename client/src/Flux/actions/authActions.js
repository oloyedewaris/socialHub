import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS
  // SET_CURRENT_USER,
} from "./types";
import axios from "axios";
import { getErrors, clearErrors } from "./errorActions";

//Log user in
export const login = ({ email, password }) => (dispatch, state) => {
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth", body, tokenConfig(state))
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response) {
        dispatch(
          getErrors(err.response.data, err.response.status, "LOGIN_FAILED")
        );
        dispatch({
          type: LOGIN_FAILED
        });
      }
    });
};

//Register User
export const register = ({
  firstName,
  lastName,
  email,
  password
}) => dispatch => {
  const body = JSON.stringify({ firstName, lastName, email, password });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  axios
    .post("/api/auth/register", body, config)
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response) {
        dispatch(
          getErrors(err.response.data, err.response.status, "REGISTER_FAILED")
        );
      }
      dispatch({
        type: REGISTER_FAILED
      });
    });
};

//Check token and load user
export const tokenConfig = getState => {
  //Get token from localstorage
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  //If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};
