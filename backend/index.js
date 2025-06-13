const express = require("express");
const cors = require("cors");
const issueRoute = require("./src/Routes/issueRoute.js");
const interactionRoute = require("./src/Routes/interactionRoute.js");
const { connectDB } = require("./connection.js");
require("dotenv").config();

const app = express();
const PORT = 3000;

// DB Connection
connectDB(`${process.env.Mongo_URL}`)
  .then(() => {
    console.log(`Db Connected`);
  })
  .catch((err) => {
    console.log(`Error : ${err}`);
  });

// Middlewares
app.use(cors());
app.use(express.json()); 

// Routes
app.use("/issue", issueRoute);
app.use("/interaction", interactionRoute);
app.use("")
// Server
app.listen(PORT, () => {
  console.log(`Server Started : ${PORT}`);
});
