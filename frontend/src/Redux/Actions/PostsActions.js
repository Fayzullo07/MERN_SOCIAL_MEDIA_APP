import { toast } from "react-toastify";
import * as PostApi from "../../api/PostsRequests";
import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  POST_ADD_COMMENT,
  POST_DELETE,
  POST_DISLIKE,
  POST_GET_ALL_FAIL,
  POST_GET_ALL_REQUEST,
  POST_GET_ALL_SUCCESS,
  POST_LIKE,
  POST_RECEIVE_COMMENT,
} from "../Constants/PostsConstants";

// GET ALL POSTS
export const getAllPosts = () => async (dispatch) => {
  dispatch({ type: POST_GET_ALL_REQUEST });
  try {
    const { data } = await PostApi.getPosts();

    dispatch({ type: POST_GET_ALL_SUCCESS, payload: data.posts });
    localStorage.setItem("posts", JSON.stringify(data.posts));
  } catch (error) {
    dispatch({
      type: POST_GET_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// CREATE POST
export const createPost =
  (title, descr, photo, navigate) => async (dispatch) => {
    dispatch({ type: CREATE_POST_REQUEST });
    try {
      const { data } = await PostApi.createPost({ title, descr, photo });

      if (data.error) {
        toast.warning(data.error);
      } else {
        navigate("/", { replace: true });
        toast.success(data.msg);
      }

      dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_POST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// LIKE POST
export const likePost = (postId, userId) => async (dispatch) => {
  await PostApi.likePost({ postId });
  dispatch({ type: POST_LIKE, payload: { postId, userId } });
};

// UN LIKE POST
export const unLikePost = (postId, userId) => async (dispatch) => {
  await PostApi.unlikePost({ postId });
  dispatch({ type: POST_DISLIKE, payload: { postId, userId } });
};

// DELETE POST
export const deletePost = (postId) => async (dispatch) => {
  const { data } = await PostApi.deletePost(postId);

  dispatch({ type: POST_DELETE, payload: postId });
  if (data.error) {
    toast.warning(data.error);
  } else {
    toast.success(data.msg);
  }
};

// ADD COMMENT
export const addComment = (postId, message) => async (dispatch) => {
  const { data } = await PostApi.addComment(postId, message);
  dispatch({
    type: POST_ADD_COMMENT,
    payload: { comments: data.comments, postId },
  });
};

// RECEIVE COMMENT
export const receiveComment = (postId) => (dispatch) => {
  setTimeout(async () => {
    const { data } = await PostApi.receiveComment(postId);
    dispatch({
      type: POST_RECEIVE_COMMENT,
      payload: { result: data.result, postId },
    });
  }, 1200);
};
