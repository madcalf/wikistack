const express = require('express');
const router = express.Router();
const pages = require('../views/index');
const { Page } = require('../models');

router.get('/', (req, res, next) => {
  res.send('hey wiki!');
});

router.get('/add', (req, res, next) => {
  res.send(pages.addPage());
});

router.post('/', async (req, res, next) => {
  const body = req.body;

  try {
    const page = await Page.create({
      title: body.title,
      content: body.content,
    });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
