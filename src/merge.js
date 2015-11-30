import isPlainObject from './_isPlainObject';

export default function merge( object, ...sources ) {
  for ( let source of sources ) {
    for ( let key in source ) {
      if ( source[ key ] === undefined ) {
        delete object[ key ];
      } else if (
        isPlainObject( source[ key ] ) &&
        isPlainObject( object[ key ] )
      ) {
        object[ key ] = merge( {}, object[ key ], source[ key ] );
      } else {
        object[ key ] = source[ key ];
      }
    }
  }
  return object;
};
