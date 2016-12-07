/* global require */
/* global process */

// Gulp specific
var gulp = require("gulp");
var concat = require("gulp-concat");
var runSequence = require("run-sequence");
var rename = require("gulp-rename");

// Logger modules
var gutil = require("gulp-util");
var colors = gutil.colors;

// File handling related modules
var del = require("del");
var fs = require("fs");

// Stream related modules
var merge = require("merge-stream");

// Network modules
var request = require("request");

// CSS, SASS and styling related modules
var cssimport = require("gulp-cssimport");
var sass = require("gulp-sass");
var minifyCSS = require("gulp-minify-css");
var autoprefixer = require("autoprefixer-core");
var postCss = require("gulp-postcss");

// JavaScript related modules
var eslint = require("gulp-eslint");
var uglify = require("gulp-uglify");

// Angular.js specific modules
var ngAnnotate = require("gulp-ng-annotate");

// Local variables
var pkg = require("./package.json");
var pluginOpts = pkg.TendrlProps;
var buildMode = process.argv[2] || "release";
var browsers = pluginOpts.targetBrowsers;

// System wide paths
var paths = (function () {

    var src = "./src/";

    return {
        src: src,
        build: pluginOpts.buildDestination,
        dest: pluginOpts.buildDestination + "/",
        preloads: pluginOpts.preloads,
        preloadFolder: "preload/",
        jsLibraries: "jsLibraries/",
        cssLibraries: "cssLibraries/",
        cssMain: pluginOpts.cssMain,
        jsFiles: pluginOpts.jsFiles,
        htmlFiles: pluginOpts.htmlFiles,
        resources: pluginOpts.resources
    };
})();

// File selection filters
var filters = (function () {
    return {
        all: "**/*.*",
        js: "**/*.{js,jst}",
        css: "**/*.css",
        scss: "**/*.scss",
        images: "**/*.{jpg,jpeg,gif,png}",
        jscss: "**/*.{js,jst,css,scss}",
        html: "**/*.html"
    };
})();

//TO-DO: make task to copy fonts folder. For now the path woff2 is hardcoded.

// Clean the dist directory
del.sync([paths.dest]);

//Copy js file of the dependent libraries 
gulp.task("jsLibraries", function() {
  return gulp.src([
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js",
    "node_modules/angular/angular.min.js",
    "node_modules/angular-route/angular-route.min.js"
  ])
  //.pipe(uglify())
  .pipe(concat("libraries.js"))
  .pipe(gulp.dest(paths.dest + paths.jsLibraries));
});

//Copy css file of the dependent libraries 
gulp.task("cssLibraries", function() {
  return gulp.src([
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "node_modules/animate.css/animate.min.css",
    "node_modules/font-awesome/css/font-awesome.min.css",
    "css/main.css"
  ])
  .pipe(postCss([autoprefixer({ browsers: browsers })]))
  .pipe(buildMode === "dev" ? gutil.noop() : minifyCSS())
  .pipe(concat("libraries.css"))
  .pipe(gulp.dest(paths.dest + paths.cssLibraries));
});

//Copy all the application files to dist except js and css
gulp.task("copy", function () {
    var filesToCopy;

    filesToCopy = [filters.all, "!../package.json", "!" + filters.jscss];

    paths.htmlFiles.forEach(function (htmlFile) {
        //filesToCopy.push("!" + htmlFile);
    });

    return gulp.src(filesToCopy, { cwd: paths.src })
        .pipe(gulp.dest(paths.dest));
});

//Task to do eslint
gulp.task("eslint", function () {
    return gulp.src([filters.js], { cwd: paths.src })
        .pipe(eslint())
        .pipe(eslint.format("stylish"))
        .pipe(buildMode === "dev" ? gutil.noop() : eslint.failAfterError());
});

//Copy the files needed to load before the bootstraping of application
gulp.task("preload", ["eslint"], function () {

    return gulp.src(paths.preloads, { base: paths.src, cwd: paths.src })
        .pipe(concat("preload.jst", { newLine: ";" }))
        .pipe(buildMode === "dev" ? gutil.noop() : ngAnnotate())
        .pipe(buildMode === "dev" ? gutil.noop() : uglify())
        .pipe(gulp.dest(paths.dest + paths.preloadFolder));
});

//Compile the scss files
gulp.task("sass", function () {
    return gulp.src([paths.cssMain], { base: paths.src, cwd: paths.src })
        .pipe(sass())
        .pipe(cssimport({
            extensions: ["css"]
        }))
        .pipe(postCss([autoprefixer({ browsers: browsers })]))
        .pipe(buildMode === "dev" ? gutil.noop() : minifyCSS())
        .pipe(gulp.dest(paths.dest));
});

//Copy the resources(fonts etc) to dist folder
gulp.task("resource", function (done) {

    var streams = merge(),
        resources = Object.keys(paths.resources);

    if (resources.length > 0) {
        resources.forEach(function (resource) {
            var stream = gulp.src(resource, { cwd: paths.src })
                .pipe(gulp.dest(paths.dest + paths.resources[resource]));

            streams.add(stream);
        });

        return streams;
    } else {
        done();
    }

});

//bundle application js files in plugin-bundle.js and copy it to dist
gulp.task("jsbundle", ["eslint"], function () {

    return gulp.src(paths.jsFiles, { cwd: paths.src })
        .pipe(concat("plugin-bundle.js"))
        .pipe(buildMode === "dev" ? gutil.noop() : ngAnnotate())
        .pipe(buildMode === "dev" ? gutil.noop() : uglify())
        .pipe(gulp.dest(paths.dest));
});

//Establish watcher for js, css, html and copy the updated file to dist 
gulp.task("watcher", function (done) {

    var filesToCopy;

    filesToCopy = [filters.images, filters.html];

    paths.htmlFiles.forEach(function (htmlPath) {
        //filesToCopy.push("!" + htmlPath);
    });

    gulp.watch(filesToCopy, { cwd: paths.src }, function (event) {
        gutil.log("Modified:", colors.yellow(event.path));
        runSequence("copy");
    });

    gulp.watch(paths.htmlFiles, { cwd: paths.src }, function (event) {
        gutil.log("Modified:", colors.yellow(event.path));
    });

    gulp.watch(filters.js, { cwd: paths.src }, function (event) {
        gutil.log("Modified:", colors.yellow(event.path));
        runSequence("preload", "jsbundle");
    });

    gulp.watch([filters.css, filters.scss], { cwd: paths.src }, function (event) {
        gutil.log("Modified:", colors.yellow(event.path));
        runSequence("sass");
    });

    done();

});

// Common task
gulp.task("common", ["eslint", "jsLibraries", "cssLibraries", "resource", "copy", "preload", "sass", "jsbundle"]);

// dev mode task
gulp.task("dev", ["common", "watcher"], function (done) {
    gutil.log(colors.bold.yellow("Watchers Established. You can now start coding"));
});

// production mode task
gulp.task("release", ["common"], function (done) {
    runSequence("ut", done);
});

//default task is release
gulp.task("default", ["release"]);
