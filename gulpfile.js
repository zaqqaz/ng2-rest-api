'use strict';
let path = require('path');
let gulp = require('gulp');
let ts = require('gulp-typescript');
let conf = {
    moduleName: 'ng-rest-api',
    paths: {
        initModule: './dev/index.js',
        src: 'src',
        dist: '/'
    }
};
let nodeExternals = require('webpack-node-externals');
let $ = require('gulp-load-plugins')();

function webpack() {
    let webpackOptions = {
        watch: false,
        module: {
            preLoaders: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader'
                }
            ],
            loaders: [
                {
                    test: /\.js|.ts$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        },
        entry: './src/index.ts',
        target: 'node',
        externals: [nodeExternals()],
        output: {
            filename: './dist/build.min.js',
            library: true,
            libraryTarget: 'commonjs'
        },
        resolve: {
            root: './src',
            extensions: ['', '.js', '.ts', '.json']
        }
    };


    let webpackChangeHandler = function (err, stats) {
        if (err) {
            conf.errorHandler('Webpack')(err);
        }
        $.util.log(stats.toString({
            colors: $.util.colors.supportsColor,
            chunks: false,
            hash: false,
            version: false
        }));
    };

    return gulp.src(path.join(conf.paths.src, conf.paths.initModule))
        .pipe($.webpack(webpackOptions, null, webpackChangeHandler))
        //.pipe($.uglify({preserveComments: $.uglifySaveLicense}))
        .pipe(gulp.dest('./'));
}

gulp.task('build', function () {
    return webpack();
});