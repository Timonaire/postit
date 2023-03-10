const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const comment = new Schema(
  {
    comment: {
      type: String,
      unique: true,
      trim: true,
      maxLength: [
        100,
        "A comment   must have less or equal than 100 characters",
      ],
      minLength: [10, "A comment  must have more or equal than 10 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
