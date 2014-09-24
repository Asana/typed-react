var gulp = require('gulp');
var path = require('path');
var runSequence = require('run-sequence');
var tslint = require('gulp-tslint');
var typescript = require('gulp-typescript');

var dirs = {
  build: path.join(__dirname, 'build'),
  src: path.join(__dirname, 'src'),
  test: path.join(__dirname, 'test'),
  typings: path.join(__dirname, 'typings')
};

var files = {
  src: path.join(dirs.src, '**', '*.ts'),
  test: path.join(dirs.test, '**', '*.ts'),
  typings: path.join(dirs.typings, '**', '*.d.ts')
};

var project = typescript.createProject({
  removeComments: false,
  noImplicitAny: true,
  noLib: false,
  target: 'ES5',
  module: 'commonjs',
  declarationFiles: true,
  noExternalResolve: true
});

gulp.task('lint', function() {
  return gulp.src([files.src, files.test])
    .pipe(tslint())
    .pipe(tslint.report('prose'));
});

gulp.task('scripts', function() {
  var ts = gulp.src([files.src, files.test, files.typings])
    .pipe(typescript(project));
  return ts.js.pipe(gulp.dest(dirs.build));
});

gulp.task('test', function(callback) {
  return runSequence('lint', 'scripts', callback);
});