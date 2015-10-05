import any from './any';
import pass from './pass';
import fail from './fail';

export default any.extend({
  attributes: {
    type: 'boolean'
  },

  cast( value ) {
    if ( value === 'true' ) {
      value = true;
    } else if ( value === 'false' ) {
      value = false;
    } else {
      value = !!value;
    }
    return value;
  },

  validate( value ) {
    if ( value === 'true' ) {
      value = true;
    } else if ( value === 'false' ) {
      value = false;
    }
    if ( typeof value !== 'boolean' ) {
      return fail( this, 'must be a boolean' );
    }
    return pass( value );
  }
});
