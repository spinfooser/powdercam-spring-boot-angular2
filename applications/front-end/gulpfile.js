const gulp = require('gulp');
const del = require('del');
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


gulp.task('clean', ['cleanDist', 'cleanPub'], function () {
});

// clean the contents of the distribution directory
gulp.task('cleanDist', function () {
    return del('build/**/*');
});

gulp.task('resources', ['cleanDist'], function () {
    return gulp
        .src('src/**/*.html')
        .pipe(gulp.dest('build'));
});

// TypeScript compile
gulp.task('compile', ['cleanDist'], function () {
    return gulp
        .src('src/**/*.ts')
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(gulp.dest('build'));
});

gulp.task('vendor', ['compile'], function () {
    return gulp.src(vendorPaths)
        .pipe(gulp.dest('build/vendor'));
});

gulp.task('index', ['vendor', 'resources'], function () {}
);

gulp.task('serve', ['index'], function () {
    return gulp.src('build')
        .pipe(server({
            livereload: true,
            open: true,
            proxies: [
                {
                    source: '/api',
                    target: 'http://localhost:8080/api/'
                }
            ]
        }));
});


gulp.task('build', ['index']);
gulp.task('default', ['index']);
