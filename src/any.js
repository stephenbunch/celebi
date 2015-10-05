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

  cast( value, options ) {
    return value;
  },

  attempt( value, options ) {
    var result = this.validate( value, options );
    if ( result.error ) {
      throw result.error;
    } else {
      return result.value;
    }
  },

  validate( value, options ) {
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
