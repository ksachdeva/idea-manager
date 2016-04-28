'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');

var pack = require('./package.json');

var docker_image_name = 'idea-manager-jobs';
var docker_repo_name = docker_image_name;
var docker_repo_name_with_tag = docker_repo_name + ':' + pack.version;

var bases = {
  dist: 'dist/'
};

gulp.task('clean', function () {
  return gulp.src(bases.dist)
    .pipe(clean());
});

gulp.task('docker_build_image', shell.task([
  'docker build -t ' + docker_repo_name_with_tag + ' .'
]));

gulp.task('docker_push_image', shell.task([
  'docker push ' + docker_repo_name_with_tag
]));

gulp.task('build_image', function (cb) {
  runSequence('docker_build_image', cb);
});

gulp.task('push_image', function (cb) {
  runSequence('build_image', 'docker_push_image', cb);
});

gulp.task('run_app_container', shell.task([
  'docker run -i --rm --name idea-manager-jobs ' + docker_repo_name_with_tag
]));
