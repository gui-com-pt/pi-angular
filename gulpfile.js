var distDir = './dist';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    requireDir = require('require-dir');

var appModules = ['./src/module.js', './src/**/module.js',
'./src/*.mdl.js', './src/**/*.mdl.js', './src/**/**/*.mdl.js', './src/**/**/**/*.mdl.js',
 './src/*.js', './src/**/*.js'],
 	dependencies = [
    './bower_components/angular-mocks/angular-mocks.js',
    './bower_components/angular-resource/angular-resource.js',
 	'./bower_components/ui-router/release/angular-ui-router.js',
    './bower_components/underscore/underscore.js'
 	];

var tasks = requireDir('./tasks');

gulp.task('build', function(){
    gulp.src(appModules)
        .pipe(concat('pi-angular.js'))
        .pipe(gulp.dest('./dist'));

    gulp.src(appModules)
        .pipe(concat('pi-angular.js'))
        .pipe(gulp.dest('./demo'));

    gulp.src(dependencies)
        .pipe(concat('dependencies.js'))
        .pipe(gulp.dest('./demo'));

    gulp.src('./bower_components/angular/angular.js')
        .pipe(concat('angular.js'))
        .pipe(gulp.dest('./demo'));
});
gulp.task('default', ['build', 'angular']);
