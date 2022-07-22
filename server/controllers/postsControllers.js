const Post = require("../models/post");
const { validationResult } = require("express-validator");

const getAllPosts = (req, res) => {
  Post.find()
    .populate("postedBy", "_id name photo")
    .populate("comments.sender", "_id name photo")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
};

const createPost = (req, res) => {
  try {
    const { title, descr, photo } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ error: errors.array()[0].msg });
    }

    const post = new Post({
      title,
      descr,
      photo,
      postedBy: req.user,
    });
    post
      .save()
      .then((result) => {
        res.json({ msg: "Created a Post Successfully", post: result });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

const like = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    { new: true }
  )
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

const disLike = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((error, result) => {
    if (error) throw error;
    res.json({ result });
  });
};

const deletePost = (req, res) => {
  Post.findOne({ _id: req?.params?.postId })
    .populate("postedBy", "_id")
    .exec((err, result) => {
      if (err || !result) {
        res.json({ error: err });
      }
      if (result?.postedBy?._id.toString() === req.user._id.toString()) {
        result
          .remove()
          .then((data) => {
            res.json({
              msg: `The post titled ${data?.title} has been deleted`,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
};

const addComment = (req, res) => {
  const comment = {
    sender: req.user._id,
    content: req.body.message,
  };

  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    { new: true }
  )
    .populate("comments.sender", "_id name photo")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getAllPosts,
  createPost,
  like,
  disLike,
  deletePost,
  addComment,
};
