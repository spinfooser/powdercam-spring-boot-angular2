const gulp = require('gulp');
const del = require('del');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var server = require('gulp-server-livereload');
const typescript = require('gulp-typescript');
var inject = require('gulp-inject');
const tscConfig = require('./tsconfig.json');

var vendorPaths = [
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/es6-shim/es6-shim.min.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/systemjs/dist/system-polyfills.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/angular2/bundles/angular2.dev.js',
    'node_modules/angular2/bundles/router.dev.js',
    'node_modules/angular2/bundles/http.dev.js'
];


gulp.task('clean', ['cleanDist'], function () {
});

// clean the contents of the distribution directory
gulp.task('cleanDist', function () {
    return del('build/**/*');
});

gulp.task('static', function () {
    return gulp
        .src(['src/**/*.ttf',
              'src/**/*.woff',
              'src/**/*.eof',
              'src/**/*.otf',
              'src/**/*.svg'
        ])
        .pipe(gulp.dest('build'));
});

gulp.task('resources', function () {
    return gulp
        .src(['!src/index.html',
              'src/**/*.html',
              'src/**/*.css'
        ])
        .pipe(gulp.dest('build'));
});

// TypeScript compile
gulp.task('compile', function () {
    return gulp
        .src('src/**/*.ts')
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(gulp.dest('build'));
});

gulp.task('vendor', ['compile'], function () {
    return gulp.src(vendorPaths)
        .pipe(gulp.dest('build/vendor'));
});

gulp.task('copy-index', function() {
   return gulp.src('src/index.html')
       .pipe(gulp.dest('build'));
});

gulp.task('index', ['resources', 'copy-index'], function () {
    var sources = gulp.src('build/**/*.css', {read: false});
    return gulp.src('build/index.html')
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('build'));
});

gulp.task('reload', ['compile', 'resources'], function () {
});

gulp.task('watch', function () {
    watch(['src/**/*.html', 'src/**/*.ts'], batch(function (events, done) {
        gulp.start('reload', done);
    }));

    watch('src/index.html', batch(function (events, done) {
        gulp.start('index', done);
    }));

    watch('src/**/*.css', batch(function (events, done) {
        gulp.start('resources', done);
    }));
});

gulp.task('serve', ['build', 'watch'], function () {
    return gulp.src('build')
        .pipe(server({
            livereload: true,
            open: true,
            fallback: 'index.html',
            proxies: [
                {
                    source: '/api',
                    target: 'http://localhost:8080/api/'
                }
            ]
        }));
});


gulp.task('build', ['index', 'static', 'vendor']);
gulp.task('default', ['build']);
