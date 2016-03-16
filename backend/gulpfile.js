'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');

var pack = require('./package.json');

var docker_image_name = 'idea-manager';
var docker_repo_name = docker_image_name;
var docker_repo_name_with_tag = docker_repo_name + ':' + pack.version;

var bases = {
  dist: 'dist/'
};

gulp.task('clean', function () {
  return gulp.src(bases.dist)
    .pipe(clean());
});

gulp.task('compile:frontend', shell.task([
  'npm run build:prod'
], {
  cwd: '../frontend'
}));

gulp.task('copy:frontend', function () {
  // copy the client
  return gulp.src('../frontend/dist/**/*')
    .pipe(gulp.dest(bases.dist + 'public/'));
});

gulp.task('prepclient', function (cb) {
  runSequence('clean', 'compile:frontend', 'copy:frontend', cb);
});

gulp.task('prepserver', ['prepclient'], function () {
  // copy the server
  return gulp.src(['./**/*.js', '!dist/**/*', '!node_modules/**/*', '!gulpfile.js', '.dockerignore', 'Dockerfile', 'package.json'])
    .pipe(gulp.dest(bases.dist));
});

gulp.task('docker_build_image', shell.task([
  'docker build -t ' + docker_repo_name_with_tag + ' ' + bases.dist
]));

gulp.task('docker_push_image', shell.task([
  'docker push ' + docker_repo_name_with_tag
]));

gulp.task('build_image', function (cb) {
  runSequence(['prepclient', 'prepserver'], 'docker_build_image', cb);
});

gulp.task('push_image', function (cb) {
  runSequence('build_image', 'docker_push_image', cb);
});