const router = require("express").Router();
const login = require("../middleware/login");
const {
  follow,
  unFollow,
  getAllUsers,
  getUser,
  updateProfile,
  getFollowerUsers,
  getFollowingUsers,
} = require("../controllers/userControllers");
const { updateProfileValidators } = require("../utils/validators");

// MIDDLEWARE
router.use(login);

router.get("/all_users", getAllUsers);

router.get("/user/:id", getUser);

router.put("/follow", follow);

router.put("/unfollow", unFollow);

router.put("/updateProfile", updateProfileValidators, updateProfile);

router.get("/getFollowerUsers/:userId", getFollowerUsers);

router.get("/getFollowingUsers/:userId", getFollowingUsers);

module.exports = router;
