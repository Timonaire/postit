const express = require('express');
const userController = require('../../controllers/userController');

const memberAuthRoutes = express.Router();

const userRoutes = function() {
  memberAuthRoutes.post('/join', userController.createNewUser);
  memberAuthRoutes.post('/login', userController.loginUser);
  memberAuthRoutes.delete('/delete/:id', userController.deleteUser);
  memberAuthRoutes.patch('/update/:id', userController.updateUser);
  memberAuthRoutes.get('/all-users', userController.getAllUsers);
  return memberAuthRoutes;
};

module.exports = userRoutes;

