var gulp = require('gulp');
var path = require('path');

var dirs = {
  src: path.join(__dirname, 'src'),
  test: path.join(__dirname, 'test')
};

var files = {
  src: path.join(dirs.src, '**', '*.ts'),
  test: path.join(dirs.test, '**', '*.ts')
};