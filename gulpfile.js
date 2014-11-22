var del = require('del');
var dtsBundle = require('dts-bundle');
var eventStream = require('event-stream');
var glob = require('glob');
var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var tsformat = require('typescript-formatter');
var tslint = require('gulp-tslint');
var typescript = require('gulp-typescript');

var build = 'build';
var dist = 'dist';
var dts = 'typings/**/*.d.ts';
var spec = 'build/test/**/*_spec.js';
var src = 'build/src/**/*';
var ts = '{src,test}/**/*.ts';

gulp.task('bundle', ['copy'], function() {
  dtsBundle.bundle({
    main: 'dist/index.d.ts',
    name: 'typed-react',
    prefix: '',
    removeSource: true,
    separator: '/dist/',
  });
});

gulp.task('clean', function(callback) {
  del([build, dist], callback);
});

gulp.task('copy', ['scripts'], function() {
  return gulp.src(src)
    .pipe(gulp.dest(dist));
});

gulp.task('format', function(callback) {
  glob(ts, function(err, files) {
    if (err) {
      return callback(err);
    }
    tsformat.processFiles(files, {
      editorconfig: false,
      replace: true,
      tsfmt: false,
      tslint: true
    });
    return callback(null);
  });
});

gulp.task('lint', function() {
  return gulp.src(ts)
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('test', ['bundle', 'spec']);

gulp.task('scripts', ['clean', 'lint'], function() {
  var hasError = false;
  var compiler = gulp.src([ts, dts])
    .pipe(typescript({
      declarationFiles: true,
      module: 'commonjs',
      noExternalResolve: true,
      noImplicitAny: true,
      noLib: false,
      removeComments: false,
      sortOutput: false,
      target: 'ES5'
    }));
  var dtsStream = compiler.dts.pipe(gulp.dest(build));
  var jsStream = compiler.js
    .on('error', function() {
      hasError = true;
    })
    .on('end', function() {
      if (hasError) {
        process.exit(8);
      }
    })
    .pipe(gulp.dest(build));
  return eventStream.merge(dtsStream, jsStream);
});

gulp.task('spec', ['scripts'], function() {
  return gulp.src(spec, {
      read: false
    })
    .pipe(mocha());
});