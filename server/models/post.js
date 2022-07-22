const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const comment = new Schema(
  {
    sender: {
      type: ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    descr: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    comments: [comment],
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
