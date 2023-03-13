const mongoose = require("mongoose");
const env = require("../config.env");

mongoose.set("strictQuery", false);
mongoose
  .connect(
    env.db_uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    { autoIndex: false }
  )
  .then(() => {
    console.log("database is functional");
  })
  .catch((e) => {
    console.log("Database Crashed", e);
  });
