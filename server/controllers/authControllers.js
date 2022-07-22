const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const generateToken = require("../config/generateToken");

const registerUser = (req, res) => {
  try {
    const { name, email, password, photo } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ error: errors.array()[0].msg });
    }

    bcrypt.hash(password, 10).then((hashedPassword) => {
      const user = new User({
        name,
        email,
        password: hashedPassword,
        photo,
      });
      user
        .save()
        .then((user) => {
          res.json({ msg: "Added successfully", user });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({ error: "Please add amail or password" });
  }

  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.json({ error: "Invalid email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const { _id, name, email, photo, followers, following } = savedUser;
          res.json({
            msg: "Successfully Login",
            token: generateToken(savedUser._id),
            user: { _id, name, email, photo, followers, following },
          });
        } else {
          return res.json({ error: "Invalid email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

module.exports = { registerUser, loginUser };
