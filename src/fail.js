import isSchema from './isSchema';

export default function( schema, reason ) {
  if ( !isSchema( schema ) ) {
    throw new Error( 'Expected first argument to be a schema.' );
  }
  return {
    error: errorFromReason( schema, reason ),
    value: null
  };
};

function errorFromReason( schema, reason ) {
  if ( typeof reason === 'string' ) {
    let error = new Error();
    error.name = 'ValidationError';
    error.message = `"${ schema.attributes.label || 'value' }" ${ reason }`;
    return error;
  } else if ( reason instanceof Error ) {
    return reason;
  } else if ( Array.isArray( reason ) ) {
    if ( reason.length === 0 ) {
      throw new Error( 'There must be at least one reason for failure.' );
    }
    let error = new Error();
    error.name = 'ValidationError';
    error.errors = reason.map( x => errorFromReason( schema, x ) );
    error.message = error.errors[0].message;
    return error;
  } else {
    throw new Error( 'Expected failure reason to be a string, error, or an array.' );
  }
}
