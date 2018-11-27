var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function(){

    browserSync.init ({
        notify: false,//hide notification label on the browser about browserSync actions
        server: {
            baseDir: "app"
        }
    });

    gulp.watch('./app/index.html', function(){
        browserSync.reload();
    });

    gulp.watch('./app/assets/styles/**/*.css', gulp.series('styles', 'cssInject'));
    
    gulp.watch('./app/assets/scripts/**/*.js', gulp.series('scripts', 'scriptsRefresh'));

});

gulp.task('cssInject', function(){
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', function(){
    browserSync.reload();
});
