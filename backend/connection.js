const mongoose = require("mongoose");
async function connectDB(url) {
  return await mongoose.connect(url);//connecting to the mongodb 
}
module.exports = { connectDB };
