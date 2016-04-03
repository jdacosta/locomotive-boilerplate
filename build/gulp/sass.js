var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');

gulp.task('sass', function () {
    return sass('assets/styles/main.scss')
        .pipe(autoprefixer())
        .pipe(minifyCss())
        .on('error', sass.logError)
        .pipe(gulp.dest('www/assets/styles'));
});
