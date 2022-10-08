var express = require('express');
var router = express.Router();

// sequalize 예제
const User = require("../models").User;

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const users = await User.findAll();
  res.render('users', { title: 'Express', users: users });
});

module.exports = router;
