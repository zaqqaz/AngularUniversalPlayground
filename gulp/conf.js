'use strict';
let gutil = require('gulp-util');
let isAdminSide = (gutil.env.side == 'admin');

exports.paths = {
    initModule: 'index.ts',
    server: 'server.ts',
    mainStyleFile: 'src-front/app/styles/main.scss',
    src: 'src-front',
    app: 'src-front/app',
    dist: 'dist/public',
    distServer: 'dist/private',
    tmp: '.tmp'
};

//if (isAdminSide) {
//    exports.paths.initModule = '/app/side-admin/index.module.js';
//    exports.paths.dist += '/admin';
//}

/**
 * Папки/файлы которые перезаписываются при билде и добавляются в гит
 */
exports.cleanDist = [
    exports.paths.dist + '/index.html',
    exports.paths.dist + '/parameters.config.js',
    exports.paths.dist + '/assets',
    exports.paths.dist + '/styles',
    exports.paths.dist + '/scripts',
    exports.paths.dist + '/fonts'
];

exports.wiredep = {
    exclude: [/bootstrap.js$/, /bootstrap-sass-official\/.*\.js/, /bootstrap\.css/],
    directory: 'bower_components'
};

exports.errorHandler = function (title) {
    return function (err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};
