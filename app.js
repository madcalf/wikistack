const express = require('express');
const app = express();
const port = 1337;
const morgan = require('morgan');
const layout = require("./views/layout.js");
const wikiIndex = require("./views/index");
const { db, Page, User } = require("./models");

app.use(morgan('dev'));

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

const init = async() => {
    await db.sync({ force: true });
    console.log("db is synced");
    app.listen(port, () => {
        console.log("Connected on port: " + port);
    })
}

init();

db.authenticate()
    .then(() => {
        console.log("connected to database");
    })

app.get('/', async (req, res, next) => {
    res.send(layout(''));
  });
  