var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: "./project",
    open: false
  });

  gulp.watch("scss/*.scss", ['sass']);
  gulp.watch(["project/**"]).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/styles.scss")
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 10 versions'] }))
        .pipe(gulp.dest("project/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);