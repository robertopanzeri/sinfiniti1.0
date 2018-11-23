//rename all 'dist' occurrences to 'docs' to be able to publish to GitHub Pages
var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
del = require('del'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
    browserSync.init ({
        notify: false,//hide notification label on the browser about browserSync actions
        server: {
            baseDir: "docs"
        }
    });
});

gulp.task('deleteDistFolder', gulp.series('icons'), function () {
    return del('./docs');
});

gulp.task('copyGeneralFiles', function() {// other files needed, not part of my app (e.g. Wordpress files)
    var pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp/**',
        '!./app/temp'
    ]
    return gulp.src(pathsToCopy)
    .pipe(gulp.dest('./docs'));
});

gulp.task('optimizeImages', function() {
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])// ! excludes
    .pipe(imagemin({
        progressive: true,
        interlaced: true,
        multipass: true
    }))
    .pipe(gulp.dest('./docs/assets/images'));
});
/*
gulp.task('useminTrigger', function() {
    gulp.start('usemin');
});
*/
gulp.task('usemin', gulp.series('styles', 'scripts'), function () {
    return gulp.src('./app/index.html')
    .pipe(usemin({
        css: [function() {return rev()}, function() {return cssnano()}],
        js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest('./docs'));
});

gulp.task('build', gulp.series('deleteDistFolder', gulp.parallel('copyGeneralFiles', 'optimizeImages', 'usemin')));
