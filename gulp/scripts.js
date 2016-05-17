'use strict';
let path = require('path');
let gulp = require('gulp');
let conf = require('./conf');
let browserSync = require('browser-sync');
let webpackStream = require('webpack-stream');
let $webpack = require("webpack");
let failPlugin = require('webpack-fail-plugin');
let $ = require('gulp-load-plugins')();

function webpack(watch, callback, server) {
    let entry = server ? './src-front/server' : './src-front/index';

    let webpackOptions = {
        watch: watch,
        resolve: {
            extensions: ['', '.js', '.ts']
        },
        plugins: [
            failPlugin
        ],
        node: {
            global: true,
            __dirname: true,
            __filename: true,
            process: true,
            Buffer: true
        },
        entry: entry,
        module: {
            loaders: [
                {
                    test: /\.html$/,
                    loader: `raw?minimize=${!watch}`
                },
                {
                    test: /\.scss/,
                    loader: 'raw!sass-loader'
                },
                {
                    test: /\.ts/,
                    exclude: /node_modules/,
                    loader: 'ts-loader'
                }
            ]
        },
        output: {filename: 'index.js'}
    };

    if (watch) {
        webpackOptions.devtool = 'inline-source-map';
    }

    if (server) {
        webpackOptions.externals = checkNodeImport;
    }

    let webpackChangeHandler = function (err, stats) {
        if (err) {
            gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
            this.emit('end');
        }
        $.util.log(stats.toString({
            colors: $.util.colors.supportsColor,
            chunks: false,
            hash: false,
            version: false
        }));

        browserSync.reload();
        if (watch) {
            watch = false;
            callback();
        }
    };

    let gulpDest = server ?  gulp.dest(path.join(conf.paths.tmp, '/server/private')):
        gulp.dest(path.join(conf.paths.tmp, '/serve/app'));

    return gulp.src(server ? path.join(conf.paths.src, conf.paths.server) : path.join(conf.paths.src, conf.paths.initModule))
        .pipe(webpackStream(webpackOptions, null, webpackChangeHandler))
        .pipe(gulpDest);
}

gulp.task('scripts', function () {
    return webpack(false);
});

gulp.task('scripts:server', function () {
    return webpack(false, false, true);
});

gulp.task('scripts:watch', ['scripts'], function (callback) {
    return webpack(true, callback);
});

// Helpers
function checkNodeImport(context, request, cb) {
    if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
        cb(null, 'commonjs ' + request); return;
    }
    cb();
}