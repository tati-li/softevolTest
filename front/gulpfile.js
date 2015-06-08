'use strict';

var gulp     = require('gulp'),
  concat     = require('gulp-concat'),
  del        = require('del'),
  uglify     = require('gulp-uglify'),
  sass       = require('gulp-sass'),
  minifyCss  = require('gulp-minify-css'),
  inject     = require('gulp-inject');

var paths = {
  src: {
    js: {
      app: [
        'src/app.js',
        'src/*.js',
        'src/**/*.js',
        'src/**/**/*.js',
        'src/**/**/**/*.js',
        'src/**/**/**/**/*.js',
        'src/**/**/**/**/**/*.js',
      ],
      libs: [
        'bower_components/angularjs/angular.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-messages/angular-messages.min.js',
      ]
    },
    css: [
      'src/style.scss',
      'src/*.scss',
      'src/**/*.scss',
      'src/**/**/*.scss',
      'src/**/**/**/*.scss',
      'src/**/**/**/**/*.scss',
      'src/**/**/**/**/**/*.scss',
    ],
    html: 'src/index.html',
    templates: [
      'src/components/*.html',
      'src/components/**/*.html',
      'src/components/**/**/*.html',
      'src/components/**/**/**/*.html',
      'src/components/**/**/**/**/*.html',
      'src/components/**/**/**/**/**/*.html',
      'src/components/**/**/**/**/**/**/*.html',
      'src/components/**/**/**/**/**/**/**/*.html',
      'src/pages/*.html',
      'src/pages/**/*.html',
      'src/pages/**/**/*.html',
      'src/pages/**/**/**/*.html',
      'src/pages/**/**/**/**/*.html',
      'src/pages/**/**/**/**/**/*.html',
      'src/pages/**/**/**/**/**/**/*.html',
      'src/pages/**/**/**/**/**/**/**/*.html'
    ]
  },

  dest: {
    root: 'build',
    js: 'build',
    libs: 'build',
    css: 'build'
  }
};

gulp.task('clean', function (cb) {
  del(['build/app.js'], cb);
});

gulp.task('appScripts', ['clean'], function () {
  return gulp.src(paths.src.js.app)
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest.js));
});

gulp.task('appLibs', function () {
  return gulp.src(paths.src.js.libs)
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest.libs));
});

gulp.task('appStyles', function () {
  gulp.src(paths.src.css)
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(gulp.dest(paths.dest.css));
});

gulp.task('appHtml', function () {
  return gulp.src(paths.src.html)
    .pipe(inject(gulp.src(paths.src.templates), {
      transform: function (filepath, file, index, length, targetFile) {
        return '<script type="text/ng-template" id="' + filepath + '">' +
          file.contents.toString() + '</script>';
      }
    }))
    .pipe(gulp.dest(paths.dest.root));
});

gulp.task('watch', ['clean', 'appHtml', 'appScripts', 'appLibs', 'appStyles'], function () {
  gulp.watch(paths.src.js.app, ['appScripts']);
  gulp.watch(paths.src.js.libs, ['appLibs']);
  gulp.watch(paths.src.css, ['appStyles']);
  gulp.watch(paths.src.html, ['appHtml']);
  gulp.watch(paths.src.templates, ['appHtml'])
});

gulp.task('default', ['clean', 'appHtml', 'appScripts', 'appLibs', 'appStyles', 'watch']);