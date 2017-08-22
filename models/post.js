const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  navTitle: String,
  title: String,
  image: String,
  imgtitle: String,
  description: String,
  timestamp: String,
  createdAt: String
  // comments: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Comment"
  //   }
  // ]
});

module.exports = mongoose.model("Post", postSchema);
