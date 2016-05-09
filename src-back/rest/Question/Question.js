"use strict";
let DB = require('./../../db.js'),
    Sequelize = require("sequelize");

let Question = DB.define('question', {
    title:  Sequelize.STRING,
    description: Sequelize.TEXT,
    answer: Sequelize.TEXT,
    isTrue: Sequelize.BOOLEAN
});

module.exports = Question;