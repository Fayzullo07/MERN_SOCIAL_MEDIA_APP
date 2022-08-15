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
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// LOGIN
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case GET_FOLLOWERS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          user: {
            ...state.userInfo.user,
            followers: action.payload,
          },
        },
      };
    case ADD_FOLLOWING:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          user: {
            ...state.userInfo.user,
            following: [...state.userInfo.user.following, action.payload],
          },
        },
      };
    case REMOVE_FOLLOWING:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          user: {
            ...state.userInfo.user,
            following: state.userInfo.user.following.filter(
              (item) => item != action.payload
            ),
          },
        },
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          user: {
            ...state.userInfo.user,
            name: action.payload.name,
            email: action.payload.email,
            photo: action.payload.photo,
          },
        },
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// GET ALL USERS
export const getAllUsersReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_ALL_REQUEST:
      return { loading: true };
    case USER_GET_ALL_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_GET_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// USER PROFILE
export const userProfileReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true };
    case USER_PROFILE_SUCCESS:
      return { loading: false, userProfileInfo: action.payload };
    case USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_FOLLOW:
      return {
        ...state,
        userProfileInfo: {
          ...state.userProfileInfo,
          user: {
            ...state.userProfileInfo.user,
            followers: [
              ...state.userProfileInfo.user.followers,
              action.payload,
            ],
          },
        },
      };
    case USER_UNFOLLOW:
      return {
        ...state,
        userProfileInfo: {
          ...state.userProfileInfo,
          user: {
            ...state.userProfileInfo.user,
            followers: state.userProfileInfo.user.followers.filter(
              (item) => item !== action.payload
            ),
          },
        },
      };
    default:
      return state;
  }
};
