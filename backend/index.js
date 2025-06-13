const express = require("express");
const app = express();
const PORT = 3000;
const { connectDB } = require("./connection.js");
require("dotenv").config();

connectDB(`${process.env.Mongo_URL}`)
  .then(() => {
    console.log(`Db Connected`);
  })
  .catch((err) => {
    console.log(`Error : ${err}`);
  });

app.listen(PORT, () => {
  console.log(`Server Started  : ${PORT}`);
});
