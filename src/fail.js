import isSchema from './isSchema';

export default function( schema, reason ) {
  if ( !isSchema( schema ) ) {
    throw new Error( 'Expected first argument to be a schema.' );
  }
  var error = new Error();
  error.name = 'ValidationError';
  if ( typeof reason === 'string' ) {
    error.message = `"${ schema.attributes.label || 'value' }" ${ reason }`;
  } else if ( Array.isArray( reason ) ) {
    error.message = `"${ schema.attributes.label || 'value' }" fails because [${ reason[0].message }]`;
    error.errors = reason;
  } else {
    throw new Error( 'Expected failure reason to be a string, error, or an array.' );
  }
  return {
    error,
    value: null
  };
};
