import any from './any';
import fail from './fail';
import pass from './pass';

export default any.extend({
  attributes: {
    type: 'string'
  },

  cast( value ) {
    return String( value || '' );
  },

  validate( value ) {
    if ( typeof value !== 'string' ) {
      return fail( `"${ this.attributes.label || 'value' }" must be a string` );
    }
    return pass( value );
  }
});
