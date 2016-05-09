"use strict";

let express = require('express'),
    DB = require("./db"),
    Rest = require('./rest/index'),
    app = express(),
    rest = new Rest(app)
    ;

app.use(express.static(__dirname + '/../web'));
app.use((req, res) => {
    res.status(404).send('Sorry cant find that!');
});

app.listen(8080);

module.exports.app = app;
//DB.sync();