import isPlainObject from './_isPlainObject';

/**
 * Transforms an object from the inside out. The root object is assumed to be a
 * plain object, and its nodes are transformed before the object is passed to
 * the replacer function have already been transformed.
 */
export default function transformObject( object, replace ) {
  if ( !isPlainObject( object ) ) {
    throw new Error( 'Object must be a plain object.' );
  }
  return _transformObject( object, replace );
};

function _transformObject( object, replace ) {
  return replace(
    Object.keys( object ).reduce( ( result, key ) => {
      if ( isPlainObject( object[ key ] ) ) {
        return {
          ...result,
          [ key ]: _transformObject( object[ key ], replace )
        };
      } else {
        return {
          ...result,
          [ key ]: object[ key ]
        };
      }
    }, {} )
  );
}
