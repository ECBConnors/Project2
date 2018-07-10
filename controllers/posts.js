const express = require('express');
const router = express.Router();
const Post = require('../models/posts.js');

//user defines new post
//if not logged in, sends to login page
router.get('/new', (req, res) => {
  if (req.session.currentUser) {
    res.render('posts/new.ejs');
  } else {
    res.redirect('/sessions/new', {target: '/posts/new'});
  }
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    res.render('posts/show.ejs', {post:post, currentUser:req.session.currentUser});
  });
});

router.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, {$set:req.body}, (err, post) => {
    res.redirect('/posts/' + req.params.id);
  });
});

router.delete('/:id', (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err, post) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

router.post('/:id/comment', (req, res) => {
  req.body.poster = req.session.currentUser.displayName;
  Post.findByIdAndUpdate(req.params.id, {$push:{comments:req.body}}, (err, comment) => {
    res.redirect('/posts/' + req.params.id);
  });
});

router.get('/:id/edit', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (req.session.currentUser) {
      if (post.author == req.session.currentUser.displayName) {
        res.render('posts/edit.ejs', {post:post});
      } else {
        res.redirect('/posts/' + req.params.id);
      }
    } else {
      res.redirect('/sessions/new');
    }
  });
});

router.post('/', (req, res) => {
  req.body.author = req.session.currentUser.displayName;
  Post.create(req.body, (err, post) => {
    res.redirect('/');
  });
});

module.exports = router;
