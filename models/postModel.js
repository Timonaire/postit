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
      maxLength: [1000, "A post   must have less or equal than 1000 characters"],
      minLength: [1, "A post  must have more or equal than 1 character"],
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
