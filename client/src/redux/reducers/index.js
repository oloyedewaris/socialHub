import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  post: postReducer,
  users: usersReducer,
});
