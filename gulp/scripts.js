'use strict';
let path = require('path');
let gulp = require('gulp');
let conf = require('./conf');
let browserSync = require('browser-sync');
let webpackStream = require('webpack-stream');
let $webpack = require("webpack");
let failPlugin = require('webpack-fail-plugin');
let $ = require('gulp-load-plugins')();

function webpack(watch, callback) {
    let babelQuery  = {
        presets: ['es2015'],
        plugins: [
            'transform-runtime',
            "transform-decorators-legacy",
            "transform-class-properties"
        ]
    };
    let webpackOptions = {
        watch: watch,
        resolve: {
            extensions: ['', '.js', '.ts']
        },
        plugins: [
            failPlugin
        ],
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
                    loader: 'babel-loader!ts-loader'
                }
            ]
        },
        output: {filename: 'index.js'}
    };

    if (watch) {
        webpackOptions.devtool = 'inline-source-map';
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

    return gulp.src(path.join(conf.paths.src, conf.paths.initModule))
        .pipe(webpackStream(webpackOptions, null, webpackChangeHandler))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')));
}

gulp.task('scripts', function () {
    return webpack(false);
});

gulp.task('scripts:watch', ['scripts'], function (callback) {
    return webpack(true, callback);
});
