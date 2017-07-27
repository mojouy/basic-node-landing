var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var buffer = require('gulp-buffer');
var pump = require('pump');

gulp.task('styles', function () {
  gulp.src('src/scss/application.scss')
    .pipe(sass({
      includePaths: 'node_modules/foundation-sites/scss',
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'))
});

gulp.task('js', function () {
  gulp.src('src/javascript/application.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./public/javascript/'))
});

gulp.task('default', function () {
  gulp.watch('src/scss/**/*.scss', ['styles'])
  gulp.watch('src/javascript/**/*.js', ['js'])
});

gulp.task('compress', function(cb) {
  pump([
        gulp.src('public/javascript/*.js'),
        uglify(),
        gulp.dest('./public/javascript/')
    ],
    cb
  );
  // gulp.src('public/javascript/*.js')
  //   .pipe(uglify({
  //       ext:{
  //           src:'-debug.js',
  //           min:'.js'
  //       },
  //       exclude: ['tasks'],
  //       ignoreFiles: ['-min.js']
  //   }))
  //   .pipe(gulp.dest('./public/javascript/'))
});
