const gulp        = require('gulp');
const imagemin    = require('gulp-imagemin');
const usemin      = require('gulp-usemin');
const del         = require('del');
const rev         = require('gulp-rev');
const cssnano     = require('gulp-cssnano');
const uglify      = require('gulp-uglify');
const browserSync = require('browser-sync').create();

gulp.task('previewDist', function(){
  browserSync.init({
    notify: false,
    server:{
      baseDir: "docs"
    }
  }); //Starts default browser when executing watch gulp task
});

gulp.task('deleteDistFolder', function(){
    return del("./docs");
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function(){
  
  let pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/img/**',
    '!./app/assets/css/**',
    '!./app/assets/js/**',
    '!./app/temp',
    '!./app/temp/**'
  ];

  return gulp.src(pathsToCopy)
             .pipe(gulp.dest("./docs"));

});

gulp.task('optimizeImages', ['deleteDistFolder'], function(){
  
  let pathsToOptimize = [
    './app/assets/img/**/*'
  ];

  return gulp.src(pathsToOptimize)
             .pipe(imagemin({
                    progressive: true, //For JPG
                    interlaced: true, //For GIF
                    multipass: true //For SVG
              }))
             .pipe(gulp.dest("./docs/assets/img"));

});

gulp.task('usemin', ['deleteDistFolder', 'styles', 'scripts'], function(){
  return gulp.src("./app/*.html")
             .pipe(usemin({
               css: [function(){return rev()}, function(){return cssnano()}],
               js: [function(){return rev()}, function(){return uglify()}]
             }))
             .pipe(gulp.dest("./docs"));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'usemin']);