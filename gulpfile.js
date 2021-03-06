var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var popper      = require('popper.js/dist/umd/popper');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js', 
        'node_modules/jquery/dist/jquery.min.js', 
        'node_modules/tether/dist/js/tether.min.js', 
        'node_modules/lightgallery/dist/js/lightgallery.min.js', 
        'node_modules/lightgallery/modules/lg-thumbnail.min.js', 
        'node_modules/owl.carousel/dist/owl.carousel.min.js', 
        'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("js"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"  
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'scss/*.scss'], ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js','serve']);