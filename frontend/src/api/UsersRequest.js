import axios from "axios";
const URL = process.env.REACT_APP_BACKEND_URL;
const API = axios.create({ baseURL: URL });

const config = {
  headers: {
    Authorization:
      "Fayzullo " + JSON.parse(localStorage.getItem("userInfo"))?.token,
  },
};

export const getUsers = () => API.get("/all_users", config);

export const searchUsers = (search) =>
  API.get(`/all_users?search=${search}`, config);

export const userProfile = (userId) => API.get(`/user/${userId}`, config);

export const userFollow = (followId) =>
  API.put("/follow", { followId }, config);

export const userUnFollow = (unfollowId) =>
  API.put("/unfollow", { unfollowId }, config);

export const updateProfile = (updateInfo) =>
  API.put("/updateProfile", updateInfo, config);

export const getFollowersUsers = (userId) =>
  API.get(`/getFollowerUsers/${userId}`, config);

export const getFollowingsUsers = (userId) =>
  API.get(`/getFollowingUsers/${userId}`, config);
