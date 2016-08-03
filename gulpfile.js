var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var stripDebug = require('gulp-strip-debug');

//We use uglify to minify the code
//and stripDebug to Strip console and debugger statements
gulp.task('compress', function (cb) {
  pump([
        gulp.src('src/*.js'),
        uglify(),
        stripDebug(),
        gulp.dest('dist')
    ],
    cb
  );
});
