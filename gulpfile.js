//import the gulp node package
var gulp = require('gulp');

//import browsersync create() method
var browsersync = require('browser-sync').create();
//save browsersync reload to a variable
var reload = browsersync.reload;

//import the uglify plugin module
var uglify = require('gulp-uglify');

//import the sass package
var sass = require('gulp-sass');

//default task runs when 'gulp' is typed.
//gulp.task takes 2 parameters, a name (string) and a callback, describing what the task should do.
gulp.task('test', function() {
  console.log('Sanity check');
});

//default task
gulp.task('default',['scripts','styles','watch']);

gulp.task('server', function() {
  browsersync.init({
    server: './build'
  })
})

// Scripts task
// uglifies,
gulp.task('scripts', function() {
  gulp.src('js/*.js') // load all the files .js files in the js directory
  .pipe(uglify()) //run uglify on files
  .pipe(gulp.dest('build/js')) //save output to minjs
  .pipe(browsersync.stream())
});

// Styles task
// magically turns css into sass
gulp.task('styles', function() {
  return gulp.src('scss/*.scss')
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(gulp.dest('build/css'))
  .pipe(browsersync.stream())
});

// WATCH task
// watches SCSS, HTML and JS
gulp.task('watch', ['server'], function() {
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('scss/*.scss', ['styles']);
  gulp.watch('./build/index.html').on('change', reload);
});
