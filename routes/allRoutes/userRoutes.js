const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");
const jwt = require("jsonwebtoken");

//CREATE
userRouter.post("/", userController.signUp);

module.exports = userRouter;
