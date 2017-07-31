var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    buffer = require('gulp-buffer'),
    pump = require('pump'),
    sassLint = require('gulp-sass-lint'),
    jshint = require('gulp-jshint');

gulp.task('styles', function () {
  gulp.src('src/scss/application.scss')
    .pipe(sass({
      includePaths: [
       'node_modules/foundation-sites/scss',
       'node_modules/compass-mixins/lib'
      ],
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

gulp.task('default', ['build', 'watch']);

gulp.task('build', function () {
  gulp.src('src/javascript/application.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./public/javascript/'))

  gulp.src('src/scss/application.scss')
    .pipe(sass({
      includePaths: [
       'node_modules/foundation-sites/scss',
       'node_modules/compass-mixins/lib'
      ],
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'))

  gulp.src('src/index.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', ['styles'])
  gulp.watch('src/javascript/**/*.js', ['js'])
  gulp.watch('src/**/*.html', ['copy'])

  gulp.src('src/**/*.s+(a|c)ss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())

  gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
});

gulp.task('compress', function(cb) {
  pump([
      gulp.src('public/javascript/*.js'),
      uglify(),
      gulp.dest('./public/javascript/')
    ],
    cb
  );
});

gulp.task('copy', function () {
  gulp.src('src/index.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('lint', function () {
  gulp.src('src/**/*.s+(a|c)ss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});
