require('dotenv').config();

const form = require('./form');

const path = require('path');
const express = require('express');
const session = require('express-session');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', form);

app.locals.isInvalid = (param, errors) => {
  if (!errors) {
    return false;
  }

  return Boolean(errors.find(i => i.param === param));
};

function notFoundHandler(req, res, next) { // eslint-disable-line
    res.status(404).render('error', { title: '404' });
  }
  
  function errorHandler(err, req, res, next) { // eslint-disable-line
    console.error(err);
    res.status(500).render('error', { err });
  }
  
  app.use(notFoundHandler);
  app.use(errorHandler);
  
  const {
    PORT: port = 3000,
    HOST: host = '127.0.0.1',
  } = process.env;
  
  app.listen(port, () => {
    console.info(`Server running at http://${host}:${port}/`);
  });