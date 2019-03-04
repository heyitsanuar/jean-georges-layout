const gulp        = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('watch', function() {

  browserSync.init({
    server:{
      baseDir: "app"
    }
  }); //Starts default browser when executing watch gulp task

  gulp.watch('./app/index.html', function(){
    browserSync.reload(); //Reloads the browser when saving changes in HTML
  });

  gulp.watch('./app/assets/css/**/*.scss', function() { 
    gulp.start('cssInject'); //Looks out for any changes in the CSS files to compile and start browser reload
  });

  gulp.watch('./app/assets/js/**/*.js', function(){
    gulp.start('scriptsRefresh');
  });

});

gulp.task('cssInject', ['styles'], function(){ 
  //First compiles our latest CSS and then loads it to our browser sync task whenever we save changes
  return gulp.src('./app/temp/css/styles.css')
          .pipe(browserSync.stream());

});

gulp.task('scriptsRefresh',['scripts'],function(){
  browserSync.reload();
});