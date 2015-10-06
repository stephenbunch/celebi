import any from './any';
import pass from './pass';
import fail from './fail';

export default function arrayOf( t ) {
  return any.extend({
    attributes: {
      type: 'array'
    },

    cast( value ) {
      if ( Array.isArray( value ) ) {
        return value.map( x => t.cast( x ) );
      } else {
        return [];
      }
    },

    pluck( selector, options ) {
      return t.pluck( selector, options );
    },

    validate( value, options = {} ) {
      if ( !Array.isArray( value ) ) {
        return fail( this, 'must be an array' );
      } else {
        let retval = [];
        let errors = [];
        for ( let i = 0; i < value.length; i++ ) {
          let item = value[ i ];
          let result = t.label( t.attributes.label || `item ${ i }`).validate( item, options );
          if ( result.error ) {
            if ( options.abortEarly ) {
              return result;
            } else {
              errors.push( result.error );
            }
          } else {
            retval.push( result.value );
          }
        }
        if ( errors.length > 0 ) {
          return fail( this, errors );
        } else {
          return pass( retval );
        }
      }
    },

    transform( transform ) {
      return arrayOf( transform( t ) );
    }
  });
};
