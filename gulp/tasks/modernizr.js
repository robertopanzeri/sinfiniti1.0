var gulp = require('gulp'),
modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() {// generates a version of modernizr that checks only for the features requested, by parsing the code of the 'src' files provided
   return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js']) 
   .pipe(modernizr({
       "options" : [
           "setClasses"
       ]
   }))
   .pipe(gulp.dest('./app/temp/scripts/'));
});