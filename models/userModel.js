const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const model = mongoose.model;

const user = new Schema(
  {
    name:{type: String, required: true},
    email: { type: String, required: true, unique: true },
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

module.exports = model("User", user);

