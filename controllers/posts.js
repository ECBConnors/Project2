const express = require('express');
const router = express.Router();
const Post = require('../models/posts.js');

router.get('/new', (req, res) => {
  res.render('posts/new.ejs');
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    res.render('posts/show.ejs', {post:post});
  });
});

router.post('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, {$set:req.body}, (err, post) => {
    res.redirect('/posts/' + req.params.id);
  });
});

router.get('/:id/edit', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    res.render('posts/edit.ejs', {post:post});
  });
});

router.post('/', (req, res) => {
  Post.create(req.body, (err, post) => {
    res.redirect('/');
  });
});

module.exports = router;
