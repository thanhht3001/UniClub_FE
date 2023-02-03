const gulp = require('gulp');
const gap = require('gulp-append-prepend');

gulp.task('licenses', function (done) {
  gulp
    .src('build/static/js/*chunk.js', { base: './' })
    .pipe(
      gap.prependText(`/*!

=========================================================
* UNICEC
=========================================================

* Coded by Trung Nguyen

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest('./', { overwrite: true }));
  gulp
    .src('build/index.html', { base: './' })
    .pipe(
      gap.prependText(`<!--
      =========================================================
      * UNICEC
      =========================================================
      
      * Coded by Trung Nguyen
      
      =========================================================
      
      * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

-->`)
    )
    .pipe(gulp.dest('./', { overwrite: true }));

  gulp
    .src('build/static/css/*chunk.css', { base: './' })
    .pipe(
      gap.prependText(`/*!

      =========================================================
      * UNICEC
      =========================================================
      
      * Coded by Trung Nguyen
      
      =========================================================
      
      * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest('./', { overwrite: true }));
  done();
  return;
});
