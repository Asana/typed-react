var gulp = require('gulp');
var mocha = require('gulp-mocha');
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
  gulp.src(files.spec)
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task('test', function(callback) {
  return runSequence('lint', 'spec', callback);
});