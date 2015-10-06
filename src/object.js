import any from './any';
import fail from './fail';
import pass from './pass';

export default any.extend({
  attributes: {
    title: 'object'
  },

  cast( value ) {
    if ( !value || typeof value !== 'object' || Array.isArray( value ) ) {
      return {};
    } else {
      return value;
    }
  },

  validate( value ) {
    if ( !value || typeof value !== 'object' || Array.isArray( value ) ) {
      return fail( this, 'must be an object' );
    } else {
      return pass( value );
    }
  }
});
