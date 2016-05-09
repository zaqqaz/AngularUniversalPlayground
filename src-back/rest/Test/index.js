"use strict";
let Test = require("./Test.js");
let nodeExcel = require('excel-export');

class TestController {
    getAll(req, res) {
        console.log(req.query);
        return Test.findAndCountAll({
            where: {
                createdAt: {
                    $gt: new Date(+req.query.date_from),
                    $lt: new Date(+req.query.date_to)
                }
            }
        }).then((result) => {
            res.header('X-Total-Count', result.count);
            res.json(result.rows);
        })
    }

    add(req, res) {
        return Test.build(req.body)
            .save()
            .then(() => {
                res.status(201);
                res.json();
            });
    }

    excel(req, res) {   
        Test.findAll().then((tests) => {
            let conf = {};
            conf.cols = [{caption: 'Имя Фамилия'}, {caption: 'Дата'}, {caption: 'Оценка'}];

            conf.rows = [];
            tests.map((test)=> {
                let name = test.firstName +' '+ test.lastName;
                let created = new Date(test.createdAt).getDate() + '/' + (+(new Date(test.createdAt).getMonth())+1) + '/' + new Date(test.createdAt).getFullYear();
                let score = test.score + ' ';
                console.log(name, created, score);
                conf.rows.push([name, created, score])
            });

            let result = nodeExcel.execute(conf);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
            res.end(result, 'binary');
        })
    }
}

module.exports = (app) => {
    let controller = new TestController();
    app.get('/', controller.getAll);
    app.post('/', controller.add);
    app.get('/excel', controller.excel);
};
