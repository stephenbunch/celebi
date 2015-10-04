import any from './any';
import fail from './fail';
import pass from './pass';

export default any.extend({
  name: 'string',

  cast( value ) {
    return String( value || '' );
  },

  validate( value ) {
    if ( typeof value !== 'string' ) {
      return fail( 'must be a string', value );
    }
    return pass( value );
  }
});
