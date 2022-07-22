const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const getAllUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword)
    .find({ _id: { $ne: req.user._id } })
    .select("-password");
  res.json({ users });
};

const getUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .then((posts) => {
          res.json({ user, posts });
        })
        .catch((error) => {
          console.log(`Post Error ${error}`);
        });
    })
    .catch((err) => {
      console.log(`User Error ${err}`);
    });
};

const follow = (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    { new: true }
  )
    .then(() => {
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.json({ error: err });
        });
    })
    .catch((err) => {
      return res.json({ error: err });
    });
};

const unFollow = (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    { new: true }
  )
    .then(() => {
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.json({ error: err });
        });
    })
    .catch((err) => {
      return res.json({ error: err });
    });
};

const updateProfile = (req, res) => {
  try {
    const { name, email, password, photo } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ error: errors.array()[0].msg });
    }

    bcrypt.hash(password, 10).then((hashedPassword) => {
      User.findByIdAndUpdate(req.user._id, {
        name,
        email,
        password: hashedPassword,
        photo,
      })
        .then(() => {
          res.json({ msg: "Update successfully" });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllUsers, getUser, follow, unFollow, updateProfile };
