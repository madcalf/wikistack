const express = require('express');
const router = express.Router();
const pages = require('../views/index');

router.get('/', (req, res, next) => {
  res.send('hey wiki!');
});

router.get('/add', (req, res, next) => {
  res.send(pages.addPage());
});

router.post('/', (req, res, next) => {
  const body = res.json(req.body);
  res.send(body);
});

module.exports = router;
