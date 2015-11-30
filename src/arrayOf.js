import any from './any';
import parse from './parse';
import pass from './pass';
import fail from './fail';

export default function arrayOf( schema ) {
  schema = parse( schema );
  return any.extend({
    attributes: {
      type: 'array',
      schema: schema
    },

    cast( value, options ) {
      if ( Array.isArray( value ) ) {
        return value.map( x => schema.cast( x, options ) );
      } else {
        return [];
      }
    },

    path( selector ) {
      return schema.path( selector );
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
      return arrayOf( transform( schema ) );
    },

    length( length ) {
      var parent = this;
      return this.extend({
        cast( value, options ) {
          return parent.cast( value, options ).slice( 0, 2 );
        },

        validate( value, options ) {
          var result = parent.validate( value, options );
          if ( result.error ) {
            return result;
          } else {
            result.value = result.value.slice( 0, 2 );
            return result;
          }
        },

        transform( transform ) {
          return parent.transform( transform ).length( length );
        }
      })
    }
  });
};
