const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");

require('dotenv').config();

const app = express();
app.use(express.json());

mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });

app.use("/api", apiRoutes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

module.exports =  app