const { body } = require("express-validator");
const User = require("../models/user");

exports.registerValidators = [
  body("email")
    .isEmail()
    .withMessage("Enter your email correctly")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("User already exist with that email");
        }
      } catch (error) {
        console.log(error);
      }
    })
    .normalizeEmail(),
  body("password", "Password should be min 6 symbols")
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
  body("confirm")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password should be similar");
      }
      return true;
    })
    .trim(),
  body("name").isLength({ min: 3 }).withMessage("Name should be min 3 symbols"),
];

exports.createPostValidators = [
  body("title")
    .isLength({ min: 2 })
    .withMessage("Title should be min 2 symbols"),
  body("descr")
    .isLength({ min: 10 })
    .withMessage("Description should be min 10 symbols"),
  body("photo").isLength({ min: 1 }).withMessage("Please input Image"),
];

exports.updateProfileValidators = [
  body("name").isLength({ min: 3 }).withMessage("Name should be min 3 symbols"),
  body("email")
    .isEmail()
    .withMessage("Enter your email correctly")
    .custom(async (value, { req }) => {
      try {
        if (req.body.myEmail === value) {
          return;
        }
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("That User already exist with that email");
        }
      } catch (error) {
        console.log(error);
      }
    })
    .normalizeEmail(),
  body("password", "Password should be min 6 symbols")
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
  body("confirm")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password should be similar");
      }
      return true;
    })
    .trim(),
  body("photo").isLength({ min: 1 }).withMessage("Please input Image"),
];
