"use strict";
let Sequelize = require('sequelize');
let env       = process.env.NODE_ENV || 'development';
let config    = require(__dirname + '/../config/config.json')[env];
let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

module.exports = sequelize;