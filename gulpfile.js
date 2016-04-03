var gulp = require('gulp');

var requireDir = require('require-dir');
requireDir('./build/gulp');

gulp.task('default', ['watch']);
