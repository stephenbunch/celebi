import any from './any';
import parse from './parse';
import pass from './pass';

export default function nullableOf( schema ) {
  return any.extend({
    attributes: {
      type: 'nullable',
      schema: schema
    },

    cast( value, options ) {
      if ( value === undefined || value === null ) {
        return null;
      } else {
        return schema.cast( value, options );
      }
    },

    validate( value, options ) {
      if ( value === undefined || value === null ) {
        return pass( null );
      } else {
        return schema.validate( value, options );
      }
    },

    pluck( selector, options ) {
      return schema.pluck( selector, options );
    },

    transform( transform ) {
      return nullableOf( transform( t ) );
    }
  });
};
