var gulp = require('gulp');
var path = require('path');
var tslint = require('gulp-tslint');

var dirs = {
  src: path.join(__dirname, 'src'),
  test: path.join(__dirname, 'test')
};

var files = {
  src: path.join(dirs.src, '**', '*.ts'),
  test: path.join(dirs.test, '**', '*.ts')
};

gulp.task('lint', function() {
  return gulp.src([files.src, files.test])
    .pipe(tslint())
    .pipe(tslint.report('prose'));
});