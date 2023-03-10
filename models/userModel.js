import mongoose from "mongoose";

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

export default model("User", user);
