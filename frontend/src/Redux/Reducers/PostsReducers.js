import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  POST_ADD_COMMENT,
  POST_CHANGE_COMMENT,
  POST_DELETE,
  POST_DISLIKE,
  POST_GET_ALL_FAIL,
  POST_GET_ALL_REQUEST,
  POST_GET_ALL_SUCCESS,
  POST_LIKE,
  POST_RECEIVE_COMMENT,
} from "../Constants/PostsConstants";

// GET ALL POSTS
export const getAllPostsReducers = (state = {}, action) => {
  switch (action.type) {
    case POST_GET_ALL_REQUEST:
      return { loading: true };
    case POST_GET_ALL_SUCCESS:
      let posts = action.payload.map((post) => {
        return {
          ...post,
          comment: false,
        };
      });
      return { loading: false, posts };
    case POST_CHANGE_COMMENT:
      let changePosts = state.posts.map((post) => {
        if (post._id === action.payload) {
          return {
            ...post,
            comment: !post.comment,
          };
        }
        return post;
      });
      return { ...state, posts: changePosts };
    case POST_GET_ALL_FAIL:
      return { loading: false, error: action.payload };
    case POST_LIKE:
      return {
        ...state,
        posts: [
          ...state.posts.map((post) => {
            if (post._id == action.payload.postId) {
              post.likes.push(action.payload.userId);
            }
            return post;
          }),
        ],
      };
    case POST_DISLIKE:
      return {
        ...state,
        posts: [
          ...state.posts.map((post) => {
            if (post._id == action.payload.postId) {
              return {
                ...post,
                likes: post.likes.filter(
                  (item) => item !== action.payload.userId
                ),
              };
            }
            return post;
          }),
        ],
      };
    case POST_DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case POST_ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              comments: action.payload.comments,
            };
          }
          return post;
        }),
      };
    case POST_RECEIVE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              // comments: [...post.comments],
              comments: [...post.comments, action.payload.result],
            };
          }
          return post;
        }),
      };
    default:
      return state;
  }
};
// CREATE POST
export const createPostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { loading: true };
    case CREATE_POST_SUCCESS:
      return { loading: false, newPost: action.payload };
    case CREATE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
