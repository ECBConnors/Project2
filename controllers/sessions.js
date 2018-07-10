const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.get('/new', (req, res) => {
  res.render('sessions/new.ejs', {target:""});
});

router.post('/', (req, res) => {
  User.findOne({username:req.body.username}, (err, user) => {
    if (err || !user) {
      console.log(err);
      res.redirect('/sessions/new');
    } else {
      console.log(user);
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.currentUser = user;
      }
      if (!req.body.target) {
        res.redirect('/');
      } else {
        res.redirect(req.body.target);
      }
    }
  });
});

router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
