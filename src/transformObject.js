import isSchema from './isSchema';

export default function transformObject( object, replace ) {
  return replace(
    Object.keys( object ).reduce( ( result, key ) => {
      if (
        typeof object[ key ] === 'object' &&
        object[ key ] !== null &&
        !isSchema( object[ key ] ) &&
        !Array.isArray( object[ key ] )
      ) {
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
