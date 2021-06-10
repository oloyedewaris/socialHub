import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  ADD_FOLLOWERS,
  REMOVE_FOLLOWERS,
  ADD_FOLLOWING,
  REMOVE_FOLLOWING,
  CHANGE_SETTINGS
} from "../actions/types";
import { createBrowserHistory } from "history";

const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user
      };
    case LOGIN_FAILED:
    case REGISTER_FAILED:
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      return {
        ...state,
        token: null,
        user: null,
        isLoading: false,
        isAuthenticated: false
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      return {
        ...state,
        token: null,
        user: null,
        isLoading: false,
        isAuthenticated: false
      };
    case ADD_FOLLOWERS:
    case REMOVE_FOLLOWERS:
    case ADD_FOLLOWING:
    case REMOVE_FOLLOWING:
      return {
        ...state,
        user: action.payload.user
      };
    case CHANGE_SETTINGS:
      alert("Settings Updated Succesfully");
      createBrowserHistory().push("/profile/settings");
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
