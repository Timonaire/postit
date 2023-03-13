const express = require('express');
const userRoutes = require("./allRoutes/userRoutes")


const router = express.Router();

// Define main routes
router.get('/', function(req, res) {
  res.send('Welcome to Postit!');
});

// Use routes defined in userRoute.js
router.use('/users', userRoutes());

module.exports = router;