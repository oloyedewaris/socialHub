import {
  AUTH_ERROR,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  // SET_CURRENT_USER,
  CHANGE_SETTINGS,
} from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      // localStorage.setItem("userData", JSON.stringify(action.payload.user));
      return {
        ...state,
        token: localStorage.getItem("token"),
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case AUTH_ERROR:
    case LOGIN_FAILED:
    case REGISTER_FAILED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      // localStorage.removeItem("userData");
      return {
        ...state,
        token: null,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    // case SET_CURRENT_USER:
    //   const loggedUser = localStorage.getItem("userData");
    //   if (loggedUser) {
    //     const userData = JSON.parse(loggedUser);
    //     return {
    //       ...state,
    //       token: localStorage.getItem("token"),
    //       user: userData,
    //       isAuthenticated: true,
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       isAuthenticated: false,
    //     };
    //   }
    case CHANGE_SETTINGS:
      return {
        ...state,
        user: {
          ...state.user,
          id: action.payload._id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          bio: action.payload.bio,
          registeredAt: action.payload.registeredAt,
        },
      };
    default:
      return state;
  }
}
