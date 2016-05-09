"use strict";
let Question = require("./Question.js");

class QuestionController {
    getAll(req, res) {
        Question.findAndCountAll().then((result) => {
            res.header('X-Total-Count', result.count);
            res.json(result.rows);
        })
    }
}

module.exports = (app) => {
    let controller = new QuestionController();
    app.get('/', controller.getAll);
};
