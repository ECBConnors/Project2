const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  text: String,
  image: String,
  comments: [{poster: String, comment: String}],
  author: String
}, {timestamps: true});
postSchema.plugin(paginate);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
