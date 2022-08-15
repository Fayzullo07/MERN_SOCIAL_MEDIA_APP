const router = require("express").Router();
const {
  getAllPosts,
  createPost,
  like,
  disLike,
  deletePost,
  addComment,
  receiveComment,
} = require("../controllers/postsControllers");
const login = require("../middleware/login");
const { createPostValidators } = require("../utils/validators");

// MIDDLEWARE
router.use(login);

// GET ALL POSTS
router.get("/allpost", getAllPosts);

// CREATE NEW POST
router.post("/createpost", createPostValidators, createPost);

// LIKE POST
router.put("/like", like);

// UNLIKE
router.put("/unlike", disLike);

// DELETE POST
router.delete("/deletepost/:postId", deletePost);

// ADD COMMENT
router.put("/comment", addComment);

// RECEIVE COMMENT
router.get("/receivecomment/:postId", receiveComment);

module.exports = router;
