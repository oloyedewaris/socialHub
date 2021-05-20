import {
  USER_LOADING,
  USER_LOADED,
  GETTING_ALL_USERS,
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  UPDATING_FOLLOW,
  ADD_FOLLOWERS,
  REMOVE_FOLLOWERS,
  ADD_FOLLOWING,
  REMOVE_FOLLOWING,
  CHANGE_SETTINGS,
} from "../actions/types";

const initialState = {
  updatingFollow: false,
  getUserLoading: false,
  getUser: {},
  allUsersLoading: false,
  allUsers: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        getUserLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        getUserLoading: false,
        getUser: action.payload,
      };
    case GETTING_ALL_USERS:
      return {
        ...state,
        allUsersLoading: true,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        allUsersLoading: false,
        allUsers: action.payload,
      };
    case GET_ALL_USERS_ERROR:
      return {
        ...state,
        getUserLoading: false,
      };
    case ADD_FOLLOWERS:
    case REMOVE_FOLLOWERS:
    case ADD_FOLLOWING:
    case REMOVE_FOLLOWING:
      return {
        ...state,
        allUsers: action.payload,
        updatingFollow: false,
      };
    case UPDATING_FOLLOW:
      return {
        ...state,
        updatingFollow: true,
      };
    case CHANGE_SETTINGS:
      alert("Settings Updated Succesfully");
      return {
        ...state,
        getUser: action.payload,
      };

    default:
      return state;
  }
}
