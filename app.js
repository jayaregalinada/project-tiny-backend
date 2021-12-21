const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const routes = require('./src/routes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/stories', routes.story);
app.use('/auth', routes.auth);

// app.get('*', (request, response) => {
//   return response.status(404).json({ error: 'Page not found.' });
// });

module.exports = app;
