const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

//route to log in screen
router.get('/new', (req, res) => {
  res.render('sessions/new.ejs', {target:""});
});

//route to log user in
router.post('/', (req, res) => {
  User.findOne({username:req.body.username}, (err, user) => {
    //if there is an error with the call, or if no user is returned, log the error and redirect back to the login page
    if (err || !user) {
      console.log(err);
      res.redirect('/sessions/new');
    } else {
      console.log(user);
      //if a match is found, log the user in
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.currentUser = user;
      }
      //if there was no redirect target, send to index
      if (!req.body.target) {
        res.redirect('/');
      } else {
        //if there was a redirect target, go there
        res.redirect(req.body.target);
      }
    }
  });
});

//log out route
router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
