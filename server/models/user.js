const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "http://cdn.onlinewebfonts.com/svg/img_518099.png",
  },
  followers: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
});

module.exports = model("User", userSchema);
