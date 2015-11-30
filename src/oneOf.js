import any from './any';
import fail from './fail';
import parse from './parse';

export default function oneOf( discriminator, schemas ) {
  for ( let key in schemas ) {
    schemas[ key ] = parse( schemas[ key ] );
  }
  return any.extend({
    attributes: {
      type: 'discriminator',
      schemas
    },

    path( selector ) {
      var [ discriminator, ...rest ] = selector.split( '.' );
      if ( !schemas[ discriminator ] ) {
        let keys = Object.keys( this.attributes.schemas );
        throw new Error( `Discriminator at "${ selector }" must be one of ${ keys.join( ', ' ) }` );
      }
      return schemas[ discriminator ].path( rest.join( '.' ) );
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
        let keys = Object.keys( this.attributes.schemas );
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
