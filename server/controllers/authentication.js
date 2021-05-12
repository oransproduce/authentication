const express = require('express');
const { storage } = require('../app.js');
const { get, create } = require('../models/users.js');
const { compareHash } = require('../../lib/hashUtils.js');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username } = req.body;
  const attempted = req.body.password;
  get(username).then(({ _id, password, salt }) => {
    if (compareHash(attempted, password, salt)) {
      // eslint-disable-next-line no-underscore-dangle
      req.session.user = _id;
      res.status(200).send({ id: _id });
    } else {
      throw new Error("username and password don't match");
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
});

// need to check if username is unique - either validators
router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  create(username, password).then((user) => {
    const { _id } = user;
    req.session.user = _id;
    res.status(201).send({ id: _id });
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
});

router.delete('/logout', (req, res) => {
  res.clearCookie('connect.sid');
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
