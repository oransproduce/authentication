const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const { secret } = require('../config.js');
const authenticationRouter = require('./controllers/authentication.js');

const app = express();

const storage = MongoStore.create({ mongoUrl: 'mongodb://localhost/sessions-authentication' });
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(
  session({
    storage,
    secret,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authenticationRouter);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

module.exports = app;
