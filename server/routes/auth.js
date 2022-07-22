const router = require("express").Router();
const { registerValidators } = require("../utils/validators");
const { registerUser, loginUser } = require("../controllers/authControllers");

router.post("/register", registerValidators, registerUser);

router.post("/login", loginUser);

module.exports = router;
