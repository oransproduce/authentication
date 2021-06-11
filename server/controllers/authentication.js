const express = require('express');
const { get, create } = require('../models/users.js');
const { compareHash } = require('../../lib/hashUtils.js');
const { sessionizeUser } = require('../util/helpers.js');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username } = req.body;
  const attempted = req.body.password;
  get(username).then((user) => {
    const { password, salt } = user;
    if (compareHash(attempted, password, salt)) {
      // eslint-disable-next-line no-underscore-dangle
      const sessionUser = sessionizeUser(user);
      req.session.user = sessionUser;
      res.status(200).send(sessionUser);
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
    const sessionUser = sessionizeUser(user);
    req.session.user = sessionUser;
    res.status(201).send(sessionUser);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
});

router.delete('/logout', ({ session }, res) => {
  const { user } = session;
  try {
    if (user) {
      session.destroy((err) => {
        if (err) {
          throw (err);
        }
        res.clearCookie('connect.sid');
        res.send(user);
      });
    } else {
      console.log('no user');
      throw new Error('No user on session');
    }
  } catch (err) {
    res.status(422).send(err);
  }
});

router.get('/loggedin', ({ session: { user } }, res) => {
  res.send(user);
});

module.exports = router;
