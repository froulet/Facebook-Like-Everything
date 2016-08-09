var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var stripDebug = require('gulp-strip-debug');
var replace = require('gulp-replace');
var inject = require('gulp-inject');

//We use uglify to minify the code
//and stripDebug to Strip console and debugger statements
gulp.task('compress', function (cb) {
  pump([
        gulp.src('src/*.js'),
        uglify({
          mangle: false
        }),
        stripDebug(),
        gulp.dest('dist')
    ],
    cb
  );
});


gulp.task('inject', function (cb) {
  gulp.src('src/FLE.iim')
    .pipe(inject(
      //Piping script.js file while replacing all whitespaces by <SP>
      gulp.src(['dist/script.js']).pipe(replace(' ', '<SP>')),
      {
      starttag: '<!-- inject:js -->',
      removeTags:true,
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
      }
    }))
    .pipe(gulp.dest('./dist'));
});
