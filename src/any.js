import fail from './fail';
import merge from './merge';
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
    if ( value === undefined ) {
      return null;
    } else {
      return value;
    }
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

  path( selector ) {
    return this;
  },

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
  },

  default( defaultValue ) {
    var parent = this;
    return this.extend({
      cast( value ) {
        if ( value === null || value === undefined ) {
          return parent.cast( defaultValue );
        } else {
          return parent.cast( value );
        }
      },
      validate( value ) {
        if ( value === null || value === undefined ) {
          return parent.validate( defaultValue );
        } else {
          return parent.validate( value );
        }
      }
    })
  }
};
