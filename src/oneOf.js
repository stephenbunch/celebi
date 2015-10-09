import any from './any';
import fail from './fail';
import parse from './parse';

export default function oneOf( discriminator, schemas ) {
  var keys = Object.keys( schemas );
  for ( let key in schemas ) {
    schemas[ key ] = parse( schemas[ key ] );
  }
  return any.extend({
    attributes: {
      type: 'discriminator',
      schemas
    },

    pluck( selector, options = {} ) {
      if ( !options.discriminators || !options.discriminators[ selector ] ) {
        throw new Error( `A discriminator is required at "${ selector }".` );
      } else if ( !schemas[ options.discriminators[ selector ] ] ) {
        throw new Error( `Discriminator at "${ selector }" must be one of ${ keys.join( ', ' ) }` );
      } else {
        return schemas[ options.discriminators[ selector ] ].pluck( selector, options );
      }
    },

    cast( value, options ) {
      if (
        typeof value === 'object' && value !== null &&
        schemas[ value[ discriminator ] ]
      ) {
        return schemas[ value[ discriminator ] ].cast( value );
      }
    },

    validate( value, options ) {
      if ( typeof value !== 'object' || value === null ) {
        return fail( this, 'must be an object' );
      }
      if ( !schemas[ value[ discriminator ] ] ) {
        return fail( this, `${ discriminator } must be one of ${ keys.join( ', ' ) }` );
      }
      return schemas[ value[ discriminator ] ].cast( value, options );
    },

    transform( transform ) {
      var schemas = {};
      for ( key in this.attributes.schemas ) {
        schemas[ key ] = transform( this.attributes.schemas[ key ] );
      }
      return oneOf( discriminator, schemas );
    }
  });
};
