import any from './any';
import pass from './pass';
import fail from './fail';

export default function( t ) {
  return any.extend({
    cast( value ) {
      if ( Array.isArray( value ) ) {
        return value.map( x => t.cast( x ) );
      } else {
        return [];
      }
    },

    validate( value ) {
      if ( !Array.isArray( value ) ) {
        return fail( 'must be an array', value );
      } else {
        let ret = [];
        for ( let item of value ) {
          let result = t.validate( item );
          if ( result.error ) {
            return result;
          } else {
            ret.push( result.value );
          }
        }
        return pass( ret );
      }
    }
  });
};
