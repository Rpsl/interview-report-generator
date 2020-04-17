const {
    series,
    parallel,
    dest,
    src
} = require('gulp');

const cleanDir = require('gulp-clean-dir');

var browserify = require('browserify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')

function clean(cb) {
    cleanDir('assets/build/');
    cb();
}

function scripts(cb) {
    browserify({
            entries: 'assets/js/index.js',
            debug: false
        })
        .bundle()
        .pipe(source('build.js'))
        .pipe(buffer())
        .pipe(dest('assets/build/'));

    src([
            'node_modules/jquery/dist/jquery.slim.min.js',
            'node_modules/jquery-serializetojson/dist/jquery.serializeToJSON.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
        ])
        .pipe(dest('assets/build'));

    cb();
}

function styles(cb) {
    src(['node_modules/github-markdown-css/github-markdown.css', 'node_modules/bootstrap/dist/css/bootstrap.min.css'])
        .pipe(dest('assets/build/'));

    cb();
}

exports.default = series(clean, parallel(styles, scripts));