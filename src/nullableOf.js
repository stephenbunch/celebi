import any from './any';
import parse from './parse';
import pass from './pass';

export default function nullableOf( schema ) {
  schema = parse( schema );
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

    path( selector ) {
      return schema.path( selector );
    },

    transform( transform ) {
      return nullableOf( transform( schema ) );
    }
  });
};
