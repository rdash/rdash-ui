var gulp = require('gulp'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  less = require('gulp-less'),
  minifycss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  rimraf = require('gulp-rimraf'),
  wrap = require('gulp-wrap');

var paths = {
  fonts: 'fonts/**.*',
  images: 'img/**/*.*',
  styles: 'less/**/*.less',
};

/*
 * Cleans the distribution directory
 */
gulp.task('clean', ['clean-css', 'clean-images', 'clean-fonts', 'clean-dist']);

gulp.task('clean-dist', function() {
  return gulp.src('dist', {read: false})
    .pipe(rimraf({force:true}));
});

gulp.task('clean-css', function () {
  return gulp.src('dist/css/*', {read: false})
    .pipe(rimraf({force:true}));
});

gulp.task('clean-images', function () {
  return gulp.src('dist/img/*', {read: false})
    .pipe(rimraf({force:true}));
});

gulp.task('clean-fonts', function () {
  return gulp.src('dist/fonts/*', {read: false})
    .pipe(rimraf({force:true}));
});

/*
 * Copy images to dist directory
 */
gulp.task('images', function(){
  return gulp.src(paths.images)
    .pipe(gulp.dest('dist/img'));
});

/*
 * Copy fonts to dist directory
 */
gulp.task('fonts', function(){
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('dist/fonts'));
});

/**
 * Compile less
 */
gulp.task('less', function(){
  return gulp.src(paths.styles)
      .pipe(less())
      .pipe(concat('rdash.css'))
      .pipe(gulp.dest('dist/css'));
});

/*
 * Minify css
 */
gulp.task('minify', function() {
  gulp.src('dist/css/rdash.css')
    .pipe(minifycss())
    .pipe(rename('rdash.min.css'))
    .pipe(gulp.dest('dist/css/'))
});

/*
 * Copy assets and compile less.
 */
gulp.task('build', ['images', 'fonts', 'less']);
