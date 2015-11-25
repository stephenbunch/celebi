import any from './any';
import fail from './fail';
import pass from './pass';

export default any.extend({
  attributes: {
    type: 'function'
  },

  cast( value ) {
    if ( typeof value === 'function' ) {
      return value;
    } else {
      return () => {};
    }
  },

  validate( value ) {
    if ( typeof value !== 'function' ) {
      return fail( this, 'must be a function' );
    } else {
      return pass( value );
    }
  }
});
