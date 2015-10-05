import any from './any';
import pass from './pass';

export default function nullableOf( t ) {
  return any.extend({
    cast( value, options ) {
      if ( value === undefined || value === null ) {
        return null;
      } else {
        return t.cast( value, options );
      }
    },

    validate( value, options ) {
      if ( value === undefined || value === null ) {
        return pass( null );
      } else {
        return t.validate( value, options );
      }
    },

    pluck( selector, options ) {
      return t.pluck( selector, options );
    },

    transform( transform ) {
      return nullableOf( transform( t ) );
    }
  });
};
