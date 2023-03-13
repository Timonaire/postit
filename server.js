const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
dotenv.config({ path: "./config.env" });
const userRoutes = require('./routes/index');

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true, useUnifiedTopology: true
  })
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 9290;

const app = express();

const baseRoute = '/post-it';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(baseRoute, userRoutes);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Resource URL not found', success: false, data: null });
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
