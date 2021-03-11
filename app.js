const express = require('express');
const app = express();
const port = 1339;
const morgan = require('morgan');
const layout = require('./views/layout.js');
const wikiIndex = require('./views/index');
const { db, Page, User } = require('./models');
const wikiRouter = require('./routes/wiki');
const usersRouter = require('./routes/users');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use('/wiki', wikiRouter);
app.use('/users', usersRouter);

const init = async () => {
  await db.sync({ force: true });
  console.log('db is synced');
  app.listen(port, () => {
    console.log('Connected on port: ' + port);
  });
};

init();

db.authenticate().then(() => {
  console.log('connected to database');
});

app.get('/', async (req, res, next) => {
  res.redirect('/wiki');
});
