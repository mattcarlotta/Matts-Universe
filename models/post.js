module.exports = (app) => {
  const mongoose = app.get('mongoose');

  const postSchema = new mongoose.Schema({
    navTitle: String,
    title: String,
    image: {
      originalName: String,
      fileName: String,
      path: String,
      apiURL: String,
      size: String,
    },
    imgtitle: String,
    description: String,
    timestamp: String,
    createdAt: String,
  });

  mongoose.model('posts', postSchema);
};
