const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const mongouri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test_app';
const Post = require('./models/posts.js');
const methodoverride = require('method-override');
const session = require('express-session');

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(methodoverride('_method'));

app.use(session({
  secret:'thissecretbestsecret',
  resave: false,
  saveUninitialized: false
}));

app.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    res.render('index.ejs', {posts:posts});
  });
});

const postsController = require('./controllers/posts.js');
app.use('/posts', postsController);

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

mongoose.connect(mongouri);

app.listen(port);
