import axios from "axios";
const URL = process.env.REACT_APP_BACKEND_URL;
const API = axios.create({ baseURL: URL });

const config = {
  headers: {
    Authorization:
      "Fayzullo " + JSON.parse(localStorage.getItem("userInfo"))?.token,
  },
};

export const getPosts = () => API.get("/allpost", config);

export const createPost = (postData) =>
  API.post("/createpost", postData, config);

export const likePost = (postId) => API.put("/like", postId, config);

export const unlikePost = (postId) => API.put("/unlike", postId, config);

export const deletePost = (postId) =>
  API.delete(`/deletepost/${postId}`, config);

export const addComment = (postId, message) =>
  API.put("/comment", { postId, message }, config);
