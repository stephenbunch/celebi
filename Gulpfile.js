require( 'babel/register' )({
  stage: 0
});

var gulp = require( 'gulp' );
var arceus = require( 'arceus' );

gulp.task( 'make', function() {
  return arceus.js.babelify({
    source: 'src/**/*',
    outdir: 'dist'
  });
});

gulp.task( 'clean', function() {
  return arceus.util.deleteAsync( 'dist' );
});

gulp.task( 'test:node', function() {
  return arceus.test.nodeAsync( 'test/**/*.spec.js' );
});

gulp.task( 'test:browser', function() {
  return arceus.test.karmaAsync( 'test/**/*.spec.js' );
});

gulp.task( 'test', [ 'test:node', 'test:browser' ] );

gulp.task( 'watch', function() {
  arceus.js.babelifyWatch({
    source: 'src/**/*',
    outdir: 'dist',
    callback() {
      arceus.util.log( 'build succeeded' );
    }
  });
});

gulp.task( 'default', function() {
  return arceus.util.gulpAsync( gulp, 'clean', 'make' );
});
