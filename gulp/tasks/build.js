//renamed all 'dist' occurrences to 'docs' to be able to publish to GitHub Pages
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
            baseDir: "dist"
        }
    });
});

gulp.task('deleteDistFolder', ['icons'], function () {
    return del('./dist');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {// other files needed, not part of my app (e.g. Wordpress files)
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
    .pipe(gulp.dest('./dist'));
});

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])// ! excludes
    .pipe(imagemin({
        progressive: true,
        interlaced: true,
        multipass: true
    }))
    .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
    gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function () {
    return gulp.src('./app/index.html')
    .pipe(usemin({
        css: [function() {return rev()}, function() {return cssnano()}],
        js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);