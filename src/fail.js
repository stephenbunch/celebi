export default function( reason ) {
  if ( reason instanceof Error ) {
    return { error: reason, value: null };
  }

  var error = new Error();
  error.name = 'ValidationError';

  if ( typeof reason === 'string' ) {
    error.message = reason;
  } else if ( Array.isArray( reason ) ) {
    if ( reason.length === 0 ) {
      throw new Error( 'There must be at least one reason for failure.' );
    }
    error.message = reason[0].message;
    error.errors = reason;
  }

  return { error, value: null };
};
