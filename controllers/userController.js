const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

function createNewUser(req, res) {
  const { email, password } = req.body;

  bcrypt.hash(password, 10, function (err, hashedPassword) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: "Error hashing password" });
    } else {
      const newUser = new User({ email, password: hashedPassword });
      newUser.save(function (err, user) {
        if (err) {
          console.log(err);
          res
            .status(500)
            .json({ success: false, message: "Error creating user" });
        } else {
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
          res.status(201).json({
            success: true,
            message: "User created",
            data: { user, token },
          });
        }
      });
    }
  });
}

function loginUser(req, res) {
  const { email, password } = req.body;

  User.findOne({ email }, function (err, user) {
    if (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "Error finding user" });
    } else if (!user) {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    } else {
      bcrypt.compare(password, user.password, function (err, match) {
        if (err) {
          console.log(err);
          res
            .status(500)
            .json({ success: false, message: "Error comparing passwords" });
        } else if (!match) {
          res
            .status(401)
            .json({ success: false, message: "Invalid email or password" });
        } else {
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
          res.status(200).json({
            success: true,
            message: "User logged in",
            data: { user, token },
          });
        }
      });
    }
  });
}

module.exports = { createNewUser, loginUser };
