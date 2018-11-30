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

    gulp.watch("./app/*.html").on('change', browserSync.reload);

    gulp.watch('./app/assets/styles/**/*.css', gulp.series('styles', 'cssInject'));
    
    gulp.watch('./app/assets/scripts/**/*.js', gulp.series('modernizr', 'scripts', 'scriptsRefresh'));

});

gulp.task('cssInject', function(){
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', function(done){
    browserSync.reload();
    done();
});
