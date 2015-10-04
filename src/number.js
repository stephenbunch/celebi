import any from './any';
import pass from './pass';
import fail from './fail';

export default any.extend({
  cast( value ) {
    value = Number( value );
    if ( isNaN( value ) ) {
      return 0;
    }
    return value;
  },

  validate( value ) {
    if ( isNaN( value ) ) {
      return fail( `"${ this.key() }" must be a number`, value );
    }
    return pass( Number( value ) );
  }
});
