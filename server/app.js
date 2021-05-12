const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { secret } = require('../config.js');
const authenticationRouter = require('./controllers/authentication.js');
// const path = require('path');
const app = express();

const storage = MongoStore.create({ mongoUrl: 'mongodb://localhost/sessions-authentication' });
// app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
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

module.exports = app;
