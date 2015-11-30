import isPlainObject from './_isPlainObject';

export default function transformObject( object, replace ) {
  return replace(
    Object.keys( object ).reduce( ( result, key ) => {
      if ( isPlainObject( object[ key ] ) ) {
        return {
          ...result,
          [ key ]: transformObject( object[ key ], replace )
        };
      } else {
        return {
          ...result,
          [ key ]: object[ key ]
        };
      }
    }, {} )
  );
};
