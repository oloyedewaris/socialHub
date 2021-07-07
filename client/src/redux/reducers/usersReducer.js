import {
  GETTING_ALL_USERS,
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  UPDATING_FOLLOW,
  ADD_FOLLOWERS,
  REMOVE_FOLLOWERS,
  ADD_FOLLOWING,
  REMOVE_FOLLOWING
} from "../actions/types";

const initialState = {
  updatingFollow: false,
  followed: false,
  allUsersLoading: false,
  allUsers: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GETTING_ALL_USERS:
      return {
        ...state,
        allUsersLoading: true,
        followed: false,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        allUsersLoading: false,
        allUsers: action.payload
      };
    case GET_ALL_USERS_ERROR:
      return {
        ...state,
        allUsersLoading: false
      };
    case ADD_FOLLOWERS:
    case REMOVE_FOLLOWERS:
    case ADD_FOLLOWING:
    case REMOVE_FOLLOWING:
      return {
        ...state,
        allUsers: action.payload.users,
        updatingFollow: false,
        followed: true,
      };
    case UPDATING_FOLLOW:
      return {
        ...state,
        updatingFollow: true
      };
    default:
      return state;
  }
}
