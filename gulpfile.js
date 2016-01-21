const gulp = require('gulp');
const del = require('del');
var server = require('gulp-server-livereload');
const typescript = require('gulp-typescript');
var inject = require('gulp-inject');
const tscConfig = require('./tsconfig.json');

var foundationPaths = [
    ['node_modules/angular2/bundles/', 'angular2-polyfills.js'],
    ['node_modules/es6-shim/', 'es6-shim.min.js'],
    ['node_modules/systemjs/dist/', 'system.src.js']
];

var edificePaths = [
    ['node_modules/rxjs/bundles/', 'Rx.js'],
    ['node_modules/angular2/bundles/', 'angular2.dev.js'],
    ['node_modules/angular2/bundles/', 'router.dev.js'],
    ['node_modules/angular2/bundles/', 'http.dev.js']
];


var concatenateVendorPaths = function (paths) {
    var result = [];
    for (var i = 0; i < paths.length; i++) {
        result.push(paths[i][0] + paths[i][1]);
    }
    return result;
};

var getDestinationVendorScriptNames = function (paths) {
    var result = [];
    for (var i = 0; i < paths.length; i++) {
        result.push('dist/vendor/' + paths[i][1]);
    }
    return result;
};


gulp.task('clean', ['cleanDist', 'cleanPub'], function () {
});

// clean the contents of the distribution directory
gulp.task('cleanDist', function () {
    return del('dist/**/*');
});

gulp.task('cleanPub', function () {
    return del('public/**/*');
});

gulp.task('resources', ['cleanDist'], function () {
    return gulp
        .src('app/**/*.html')
        .pipe(gulp.dest('dist/app'));
});

// TypeScript compile
gulp.task('compile', ['cleanDist'], function () {
    return gulp
        .src('app/**/*.ts')
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(gulp.dest('dist/app'));
});

gulp.task('vendor', ['compile'], function () {
    return gulp.src(concatenateVendorPaths(foundationPaths).concat(
        concatenateVendorPaths(edificePaths)))
        .pipe(gulp.dest('dist/vendor'));
});

gulp.task('index', ['vendor'], function () {
    return gulp.src('app/index.html')
        .pipe(inject(
            gulp.src(getDestinationVendorScriptNames(foundationPaths), {read: false} ),
            {ignorePath: 'dist/', name: 'foundation'}
        ))
        .pipe(inject(gulp.src(getDestinationVendorScriptNames(edificePaths), {read: false} ),
            {name: 'edifice', ignorePath: 'dist/'}
        ))
        .pipe(gulp.dest('dist/'));
});

gulp.task('serve', ['index', 'resources'], function () {
    return gulp.src('dist')
        .pipe(server({
            fallback: 'index.html',
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

gulp.task('boot', ['cleanPub', 'index', 'resources'], function () {
    return gulp
        .src('dist/**/*')
        .pipe(gulp.dest('public/static'));
});


gulp.task('build', ['compile']);
gulp.task('default', ['build']);
