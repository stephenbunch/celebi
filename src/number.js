import any from './any';
import pass from './pass';
import fail from './fail';

export default any.extend({
  attributes: {
    type: 'number'
  },

  cast( value ) {
    value = Number( value );
    if ( isNaN( value ) ) {
      return 0;
    }
    return value;
  },

  validate( value ) {
    if ( isNaN( value ) ) {
      return fail( `"${ this.attributes.label || 'value' }" must be a number` );
    }
    return pass( Number( value ) );
  }
});
