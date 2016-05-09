"use strict";
let fs = require('fs'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');

class Rest {
    constructor(app) {
        this.getDirectories(__dirname).map((name) => {
            let endpoint = express();
            endpoint.use(cors());
            endpoint.use(bodyParser.json());
            app.use('/api/' + name + 's', endpoint);
            require(__dirname + '/' + name + '/index.js')(endpoint);
        });
    }

    getDirectories(srcpath) {
        return fs.readdirSync(srcpath).filter((file) => {
            return fs.statSync(path.join(srcpath, file)).isDirectory();
        });
    }
}

module.exports = Rest;