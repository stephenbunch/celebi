import isPlainObject from './_isPlainObject';

/**
 * Transforms an object from the outside in. Nodes of objects passed to the
 * replacer function have not been transformed. The object is transformed first,
 * and if the result is a plain object, its nodes are also transformed.
 */
export default function transformObjectOutsideIn( object, replace ) {
  object = replace( object );
  if ( isPlainObject( object ) ) {
    return Object.keys( object ).reduce( ( result, key ) => {
      return {
        ...result,
        [ key ]: transformObjectOutsideIn( object[ key ], replace )
      }
    }, {} );
  } else {
    return object;
  }
};
