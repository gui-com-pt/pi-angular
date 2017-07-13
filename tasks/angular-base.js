var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('angular', function(){

    gulp.src(['./bower_components/angular/angular.js', './bower_components/angular-i18n/angular-locale_pt.js'])
      .pipe(concat('angular.js'))
      .pipe(gulp.dest('./dist'));

});
