"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();
const run = require('run-sequence');
const rename = require("gulp-rename");
const del = require('del');
const csso = require('gulp-csso');
const htmlmin = require('gulp-htmlmin');

// var sourcemap = require("gulp-sourcemaps");
// var imagemin = require("gulp-imagemin");
// var webp = require("gulp-webp");
// var svgstore = require("gulp-svgstore");
// var posthtml = require("gulp-posthtml");
// var include = require("posthtml-include");

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**", // добавила
    // "source/*.ico", // добавила
    "source/**/*.html",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("style", function() {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    // .pipe(sourcemap.init()) // добавила
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style-min.css"))
    .pipe(gulp.dest("build/css"))
    // .pipe(sourcemap.write(".")) // добавила
    .pipe(server.stream());
});

// gulp.task("images", function () { // добавила
//   return gulp.src("source/img/**/*.{png,jpg,svg}")
//     .pipe(imagemin([
//       imagemin.optipng({optimizationLevel: 3}),
//       imagemin.jpegtran({progressive: true}),
//       imagemin.svgo()
//     ]))
//     .pipe(gulp.dest("source/img"))
// });

// gulp.task("webp", function () { // добавила
//   return gulp.src("source/img/**/*.{png,jpg}")
//     .pipe(webp({quality: 90}))
//     .pipe(gulp.dest("source/img"))
// });

// gulp.task("sprite", function () { // добавила
//   return gulp.src("source/img/icon-*.svg")
//     .pipe(svgstore({
//       inLineSvg: true
//     }))
//     .pipe(rename("sprite.svg"))
//     .pipe(gulp.dest("build/img"));
// });

gulp.task('htmlmin', function() {
  return gulp.src("build/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
});

// gulp.task("html", function () { // добавила
//   return gulp.src("source/*.html")
//     .pipe(posthtml([
//       include()
//     ]))
//     .pipe(gulp.dest("build"));
// });

gulp.task("copyHtml", function () {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
});

gulp.task('build', gulp.series('clean', 'copy', 'style', 'htmlmin', function (done) {
  done();
}));

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("style"));
  // gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh")); // добавила
  gulp.watch("source/*.html", gulp.series("copyHtml")).on("change", server.reload);
});

// gulp.task("refresh", function (done) { // добавила
//   server.reload();
//   done();
// });

// gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "html")); // добавила
// gulp.task("start", gulp.series("build", "server")); // добавила
