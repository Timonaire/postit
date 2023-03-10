const mongoose = require("mongoose");
// const slugify = require("slugify");
// const validator = require("validator");

const post = new Schema(
  {
    post: {
      type: String,
      required: [true, "A post must have a comment"],
      unique: true,
      trim: true,
      maxLength: [200, "A post   must have less or equal than 200 characters"],
      minLength: [10, "A post  must have more or equal than 10 characters"],
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
