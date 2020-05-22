const express = require('express');
const router = express.Router();
const user = require('./../db.json')
const request =require ('request')

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/', function(req, res, next) {
    // set a new dynamic id
  let newId = Number(++user.usersDb.length);
  console.log("Creating " + req.body.Username + " on the new id of: " + newId);
  // make a post request to our database and update the id
  request({
    url: "http://localhost:3000/usersDb",
    method: "POST",
    form: {
      id: Number(newId),
      Username: req.body.Username,
      email: req.body.email,
      Password: req.body.Password
    }
  }, 
  function(error, response, body) {
    // send a response message
    console.log("The error is: ", error);
    console.log("The body:", body);
  });
  res.redirect('/login');
});

module.exports = router;
