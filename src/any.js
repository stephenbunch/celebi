import fail from './fail';
import merge from 'lodash.merge';
import pass from './pass';

export default {
  attributes: {
    type: 'any'
  },

  label( name ) {
    return this.extend({
      attributes: {
        label: name
      }
    });
  },

  cast( value ) {
    return value;
  },

  validate( value ) {
    return { error: null, value };
  },

  pluck( selector, options ) {},

  extend( spec ) {
    return merge( {}, this, spec );
  },

  transform( transform ) {
    return this;
  },

  valid( values ) {
    return this.extend({
      validate( value ) {
        if ( values.indexOf( value ) === -1 ) {
          return fail( this, 'is invalid' );
        } else {
          return pass( value );
        }
      }
    });
  }
};
