import any from './any';
import pass from './pass';
import fail from './fail';

export default function arrayOf( schema ) {
  return any.extend({
    attributes: {
      type: 'array',
      schema: schema
    },

    cast( value ) {
      if ( Array.isArray( value ) ) {
        return value.map( x => schema.cast( x ) );
      } else {
        return [];
      }
    },

    pluck( selector, options ) {
      return schema.pluck( selector, options );
    },

    validate( value, options = {} ) {
      if ( !Array.isArray( value ) ) {
        return fail( this, 'must be an array' );
      } else {
        let retval = [];
        let errors = [];
        for ( let i = 0; i < value.length; i++ ) {
          let item = value[ i ];
          let result = schema.label( schema.attributes.label || `item ${ i }`).validate( item, options );
          if ( result.error ) {
            errors.push({
              key: i,
              message: result.error.message
            });
            if ( options.abortEarly ) {
              break;
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
