import any from './any';
import fail from './fail';
import pass from './pass';

// http://stackoverflow.com/a/46181
const email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export default any.extend({
  attributes: {
    type: 'string'
  },

  cast( value ) {
    return String( value || '' );
  },

  validate( value ) {
    if ( !value || typeof value !== 'string' ) {
      return fail( this, 'must be a non-empty string' );
    }
    return pass( value );
  },

  email() {
    var parent = this;
    return this.extend({
      validate( value, options ) {
        if ( !email.test( value ) ) {
          return fail( this, 'must be an email' );
        } else {
          return parent.validate( value, options );
        }
      }
    });
  },

  lowerCase() {
    var parent = this;
    return this.extend({
      cast( value ) {
        return parent.cast( value ).toLowerCase();
      },
      validate( value, options ) {
        var result = parent.validate( value, options );
        if ( result.value ) {
          result.value = result.value.toLowerCase();
        }
        return result;
      }
    })
  },

  trim() {
    var parent = this;
    return this.extend({
      cast( value ) {
        return parent.cast( value ).trim();
      },
      validate( value, options ) {
        var result = parent.validate( value, options );
        if ( result.value ) {
          result.value = result.value.trim();
        }
        return result;
      }
    })
  },

  default( defaultValue ) {
    var parent = this;
    return this.extend({
      cast( value ) {
        if ( !value ) {
          return parent.cast( defaultValue );
        } else {
          return parent.cast( value );
        }
      },

      validate( value ) {
        if ( !value ) {
          return parent.cast( defaultValue );
        } else {
          return parent.cast( value );
        }
      }
    });
  }
});
