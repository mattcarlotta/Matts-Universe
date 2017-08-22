const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  navTitle: String,
  title: String,
  image: String,
  imgtitle: String,
  description: String,
});

module.exports = mongoose.model("Project", projectSchema);
