const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.get('/new', (req, res) => {
  res.render('users/new.ejs', {dupe:false});
});

router.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, user) => {
    if (err) {
      let dupe = false;
      if (err.message.includes('displayName')) {
        dupe = 'Display name';
      } else if (err.message.includes('username')) {
        dupe = 'username';
      }
      console.log(dupe);
      res.render('users/new.ejs', {dupe: dupe});
    } else {
      req.session.currentUser = user;
      res.redirect('/');
    }
  });
});

module.exports = router;
