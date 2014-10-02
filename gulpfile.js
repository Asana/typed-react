var childProcess = require('child_process');
var del = require('del');
var dts = require('dts-bundle');
var glob = require('glob');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var path = require('path');
var runSequence = require('run-sequence');
var tslint = require('gulp-tslint');
var typescript = require('gulp-typescript');

var dirs = {};
dirs.build = path.join(__dirname, 'build');
dirs.js = path.join(dirs.build, 'src');
dirs.spec = path.join(dirs.build, 'test');
dirs.src = path.join(__dirname, 'src');
dirs.test = path.join(__dirname, 'test');
dirs.typings = path.join(__dirname, 'typings');

var files = {};
files.build = path.join(dirs.build, 'src', '**', '*.{d.ts,js}');
files.definition = path.join(__dirname, 'typed-react.d.ts');
files.dts = path.join(dirs.js, 'index.d.ts');
files.main = path.join(__dirname, 'index.js');
files.spec = path.join(dirs.build, 'test', '**', '*.js');
files.ts = path.join(__dirname, '{src,test}', '**', '*.ts');
files.typings = path.join(dirs.typings, '**', '*.d.ts');

gulp.task('build', ['copy']);

gulp.task('bundle', ['scripts'], function() {
  dts.bundle({
    name: 'typed-react',
    main: files.dts
  })
});

gulp.task('clean', function(callback) {
  del([dirs.build, files.main, files.definition], callback);
});

gulp.task('copy', ['remove'], function() {
  gulp.src(files.build)
    .pipe(gulp.dest(__dirname));
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

gulp.task('remove', ['bundle'], function(callback) {
  del([files.dts], callback);
});

gulp.task('scripts', ['clean'], function() {
  var ts = gulp.src([files.ts, files.typings])
    .pipe(typescript({
      removeComments: false,
      noImplicitAny: true,
      noLib: false,
      target: 'ES5',
      module: 'commonjs',
      declarationFiles: true,
      noExternalResolve: true
    }));
  ts.dts.pipe(gulp.dest(dirs.build));
  return ts.js.pipe(gulp.dest(dirs.build));
});

gulp.task('spec', ['scripts'], function() {
  return gulp.src(files.spec)
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task('test', function(callback) {
  return runSequence('lint', 'spec', callback);
});