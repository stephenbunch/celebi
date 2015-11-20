require( 'babel/register' )({
  stage: 0
});

var gulp = require( 'gulp' );
var arceus = require( 'arceus' );

gulp.task( 'make', function() {
  return arceus.js.babelify( 'src/**/*', 'dist' );
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
  arceus.js.babelifyWatch( 'src/**/*', 'dist' );
});

gulp.task( 'default', function() {
  return arceus.util.gulpAsync( gulp, 'clean', 'make' );
});
