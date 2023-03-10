// import mongoose from "mongoose";
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const user = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

user.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

// const testUser = new User({
//   email: "akolite98@gmail.com",
//   password: "Akolite",
// });

// testUser
//   .save()
//   .then((doc) => {
//     console.log.log(doc);
//   })
//   .catch((err) => {
//     console.log("ERROR:", err);
//   });
