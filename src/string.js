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
          return parent.validate.call( this, value, options );
        }
      }
    });
  },

  lowerCase() {
    var parent = this;
    return this.extend({
      cast( value ) {
        return parent.cast.call( this, value ).toLowerCase();
      },
      validate( value, options ) {
        var result = parent.validate.call( this, value, options );
        if ( result.value ) {
          result.value = result.value.toLowerCase();
        }
        return result;
      }
    })
  },

  upperCase() {
    var parent = this;
    return this.extend({
      cast( value ) {
        return parent.cast.call( this, value ).toUpperCase();
      },
      validate( value, options ) {
        var result = parent.validate.call( this, value, options );
        if ( result.value ) {
          result.value = result.value.toUpperCase();
        }
        return result;
      }
    })
  },

  trim() {
    var parent = this;
    return this.extend({
      cast( value, options ) {
        return parent.cast.call( this, value, options ).trim();
      },
      validate( value, options ) {
        var result = parent.validate.call( this, value, options );
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
      cast( value, options ) {
        if ( !value ) {
          return parent.cast.call( this, defaultValue, options );
        } else {
          return parent.cast.call( this, value, options );
        }
      },

      validate( value, options ) {
        if ( !value ) {
          return parent.validate.call( this, defaultValue, options );
        } else {
          return parent.validate.call( this, value, options );
        }
      }
    });
  },

  optional() {
    var parent = this;
    return this.extend({
      attributes: {
        optional: true
      },

      cast( value, options ) {
        if ( !value ) {
          return;
        } else {
          return parent.cast.call( this, value, options );
        }
      },

      validate( value, options ) {
        if ( !value ) {
          return pass();
        } else {
          return parent.validate.call( this, value, options );
        }
      }
    });
  }
});
