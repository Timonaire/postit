const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

async function createNewUser(req, res) {
  const { name, email, password } = req.body;
  // verification for user
  const user = await User.findOne({email})
  if (!user){
    bcrypt.hash(password, 10, function (err, hashedPassword) {
      if (err) {
        res
          .status(500)
          .json({ success: false, message: "Error hashing password" });
      } else {
        const newUser = new User({ name, email, password: hashedPassword });
  
        // saving new user
        newUser.save()
        .then(savedUser => {
          const token = jwt.sign({ name }, process.env.JWT_SECRET);
          res.status(200).json({
            success: true,
            message: 'Saved successfully',
            data: { savedUser, token},
          });
        })
        .catch(err => {
          res.status(500).json({
            success: false,
            message: 'Error saving user',
          });
        });
      }
    });
  } else if( user) {
    res.status(500).json({
      success: false,
      message: 'Error! User already exists',
    });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed.' });
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(401).json({ message: 'Authentication failed.' });
    }
    if (result) {
      const token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Authentication successful.', token: token });
    }
    res.status(401).json({ message: 'Authentication failed.' });
  });
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error getting users.' });
  }
};

async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    console.log("deletedUser", deletedUser);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting user.' });
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ message: 'User updated successfully.', user: user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user.' });
  }
}

module.exports = { createNewUser, loginUser, deleteUser, updateUser, getAllUsers };
