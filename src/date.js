import any from './any';
import fail from './fail';
import pass from './pass';

export default any.extend({
  cast( value ) {
    if ( value instanceof Date ) {
      return value;
    } else {
      return new Date( value || null );
    }
  },

  validate( value ) {
    if ( !( value instanceof Date ) ) {
      value = new Date( value );
    }
    if ( isNaN( value ) ) {
      return fail( this, 'must be a valid date' );
    } else {
      return pass( value );
    }
  }
});
