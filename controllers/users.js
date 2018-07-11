const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

//route for new users
router.get('/new', (req, res) => {
  res.render('users/new.ejs', {dupe:false});
});

//route to create user
router.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  //try to create user
  User.create(req.body, (err, user) => {
    //if it fails, it will throw an error
    //this is usually because of a reapeated displayname or username
    if (err) {
      let dupe = false;
      //capture which was repeated, then send the page back to the user and display error message
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
