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

var inject = require('gulp-inject');


gulp.task('inject', function (cb) {
  gulp.src('src/FLE.iim')
    .pipe(inject(gulp.src(['src/bookmarklet.js']), {
      starttag: '<!-- inject:js -->',
      removeTags:true,
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
      }
    }))
    .pipe(gulp.dest('./dist'));
});
