var childProcess = require('child_process');
var del = require('del');
var glob = require('glob');
var gulp = require('gulp');
var jest = require('jest-cli');
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
  typings: path.join(dirs.typings, '**', '*.d.ts'),
  build: path.join(dirs.build, 'src', '**', '*.{d.ts,js}'),
  ts: path.join(__dirname, '{src,test}', '**', '*.ts'),
  spec: path.join(dirs.build, 'test', '**', '*.js'),
  main: path.join(__dirname, 'index.js'),
  dts: path.join(__dirname, 'index.d.ts')
};

gulp.task('clean', function(callback) {
  del([dirs.build, files.main, files.dts], callback);
});

gulp.task('copy', ['scripts'], function() {
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

gulp.task('spec', ['scripts'], function(callback) {
  jest.runCLI({
    config: {
      rootDir: __dirname,
      testDirectoryName: 'test'
    }
  }, function(success) {
    callback(success ? null : success);
  });
});

gulp.task('build', ['copy']);

gulp.task('test', function(callback) {
  return runSequence('lint', 'spec', callback);
});