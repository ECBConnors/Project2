const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: String,
  text: String,
  image: String,
  comments: [String]
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
