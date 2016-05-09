"use strict";
let DB = require('./../../db.js'),
    Sequelize = require("sequelize");

let Test = DB.define('test', {
    firstName:  Sequelize.STRING,
    lastName: Sequelize.TEXT,
    score: Sequelize.INTEGER
});

module.exports = Test;