var childProcess = require('child_process');
var glob = require('glob');
var gulp = require('gulp');
var jest = require('gulp-jest');
var path = require('path');
var rimraf = require('rimraf');
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
  typings: path.join(dirs.typings, '**', '*.d.ts'),
  ts: path.join(__dirname, '{src,test}', '**', '*.ts'),
  spec: path.join(dirs.build, 'test', '**', '*.js')
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

gulp.task('clean', function(callback) {
  rimraf(dirs.build, callback);
});

gulp.task('format', function(callback) {
  glob(files.ts, function(err, files) {
    if (err) {
      return callback(err);
    }
    if (files.length === 0) {
      return callback(null);
    }
    var command = [
      'node_modules/.bin/tsfmt',
      '--replace',
      '--no-editorconfig',
      '--no-tsfmt'
    ].concat(files).join(' ');
    childProcess.exec(command, callback);
  });
});

gulp.task('lint', function() {
  return gulp.src(files.ts)
    .pipe(tslint())
    .pipe(tslint.report('prose'));
});

gulp.task('scripts', ['clean'], function() {
  var ts = gulp.src([files.ts, files.typings])
    .pipe(typescript(project));
  return ts.js.pipe(gulp.dest(dirs.build));
});

gulp.task('spec', ['scripts'], function() {
  return gulp.src(dirs.build)
    .pipe(jest({
      testDirectoryName: 'test'
    }));
});

gulp.task('test', function(callback) {
  return runSequence('lint', 'spec', callback);
});