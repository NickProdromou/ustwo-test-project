//import the gulp node package
var gulp = require('gulp');

//import browsersync create() method
var browsersync = require('browser-sync').create();
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



/*
------------------------------------
SETTING UP A PIPELINE:
pass multiple tasks in an array to a single task, to run consecutively.
------------------------------------
gulp.task('build' ['task1',task2,'task3']);
-----------------------------------
*/

/*
------------------------------------
GULP WATCH METHOD SYNTAX
------------------------------------
gulp.task('watch', function() {
  gulp.watch('js/*.js', ['scripts']); // watch files in the js directory, run 'scripts' task each time a file changes/is saved
});

-----------------------------------
*/

//task to uglify JavaScript (minify)
gulp.task('default',['scripts','styles','watch']);


// Scripts task
// uglifies,
gulp.task('scripts', function() {
  gulp.src('js/*.js') // load all the files .js files in the js directory
  .pipe(uglify()) //run uglify on files
  .pipe(gulp.dest('build/js')); //save output to minjs
  .pipe(browsersync.stream())
});

gulp.task('server', function() {
  browsersync.init({
    server: './'
  })
})

// Styles task
// magically turns css into sass
gulp.task('styles', function() {
  return gulp.src('style/*.scss')
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(gulp.dest('build/css'))
  .pipe(browsersync.stream())
});

// WATCH task
// watches SCSS, HTML and JS
gulp.task('watch', ['server'], function() {
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('style/*.scss', ['styles']);
  gulp.watch('*.html').on('change', reload);
});


/*
------------------------------------
GULP TASK METHOD SYNTAX
------------------------------------
gulp.task('nameOfTask', function() {
  //describe what the task should do.
})
-----------------------------------
*/

/*
------------------------------------
GULP src method
------------------------------------
gulp.task('nameOfTask', function() {
  gulp.src('directory/file/wildcard'); --> any files with extention .scss
})
-----------------------------------
*/

/*
------------------------------------
GULP pipe method
------------------------------------
gulp.task('nameOfTask', function() {
  gulp.src('directory/file/wildcard'); //load the files
  .pipe(sampleFunction()) //specify a function to run on the files
  .pipe(gulp.dest('destination folder')) //specify where output should save
})
-----------------------------------
*/
