import { toast } from "react-toastify";
import * as AuthApi from "../../api/AuthRequest";
import * as UsersApi from "../../api/UsersRequest";
import {
  ADD_FOLLOWING,
  GET_FOLLOWERS,
  REMOVE_FOLLOWING,
  UPDATE_PROFILE,
  USER_FOLLOW,
  USER_GET_ALL_FAIL,
  USER_GET_ALL_REQUEST,
  USER_GET_ALL_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UNFOLLOW,
} from "../Constants/UserConstants";

// REGISTER
export const register = (dataForm, navigate) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const { data } = await AuthApi.register(dataForm);

    if (data.error) {
      toast.warning(data.error);
    } else {
      navigate("/login", { replace: true });
      toast.success(data.msg);
    }

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// LOGIN
export const login = (email, password, navigate) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const { data } = await AuthApi.login({ email, password });
    if (data.error) {
      toast.warning(data.error);
    } else {
      navigate("/", { replace: true });
      document.location.href = "/";
      toast.success(data.msg);
    }

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// LOGOUT
export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/login";
  toast.error("Be healthy until you see !");
};

// GET ALL USERS
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: USER_GET_ALL_REQUEST });
  try {
    const { data } = await UsersApi.getUsers();
    dispatch({ type: USER_GET_ALL_SUCCESS, payload: data.users });
    localStorage.setItem("users", JSON.stringify(data.users));
  } catch (error) {
    dispatch({
      type: USER_GET_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// USER PROFILE
export const userProfileAction = (userId) => async (dispatch) => {
  dispatch({ type: USER_PROFILE_REQUEST });
  try {
    const { data } = await UsersApi.userProfile(userId);
    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// GET MY PROFILE FOLLOWERS
export const getMyFollowers = (myId) => async (dispatch) => {
  const { data } = await UsersApi.userProfile(myId);
  dispatch({ type: GET_FOLLOWERS, payload: data.user.followers });
};

// USER FOLLOW
export const userFollow = (followId, myId) => async (dispatch) => {
  dispatch({ type: USER_FOLLOW, payload: myId });
  await UsersApi.userFollow(followId);
  dispatch({ type: ADD_FOLLOWING, payload: followId });
};

// USER UNFOLLOW
export const userUnFollow = (unfollowId, myId) => async (dispatch) => {
  dispatch({ type: USER_UNFOLLOW, payload: myId });
  await UsersApi.userUnFollow(unfollowId);
  dispatch({ type: REMOVE_FOLLOWING, payload: unfollowId });
};

// UPDATE PROFILE
export const updateProfile =
  (name, email, password, confirm, photo, myEmail, setShowEditModal) =>
  async (dispatch) => {
    const { data } = await UsersApi.updateProfile({
      name,
      email,
      password,
      confirm,
      photo,
      myEmail,
    });
    if (data.error) {
      toast.warning(data.error);
    } else {
      toast.success(data.msg);
      setShowEditModal(false);
      dispatch({ type: UPDATE_PROFILE, payload: { name, email, photo } });
    }
  };
