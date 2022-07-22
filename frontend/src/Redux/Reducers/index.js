import { combineReducers } from "redux";
import { createPostReducer, getAllPostsReducers } from "./PostsReducers";

import {
  getAllUsersReducers,
  userLoginReducer,
  userProfileReducers,
  userRegisterReducer,
} from "./UserReducers";

export const reducers = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  users: getAllUsersReducers,
  post: createPostReducer,
  posts: getAllPostsReducers,
  userProfile: userProfileReducers,
});
