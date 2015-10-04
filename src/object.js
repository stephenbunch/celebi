import any from './any';
import flatten from './flatten';
import pass from './pass';
import fail from './fail';

export default any.extend( keys => {
  var paths = flatten( keys );

  return {
    name: 'object',

    cast( value, options ) {
      if ( value === null || typeof value !== 'object' ) {
        value = {};
      }
      for ( let path of paths ) {
        path.set( value, path.value.cast( path.get( value ) ) );
      }
      return value;
    },

    validate( value, options ) {
      if ( value === null || typeof value !== 'object' ) {
        return fail( `"${ this.key() }" must be an object`, value );
      }
      var errors = [];
      var ret = {};
      for ( let path of paths ) {
        let key = path.value.key( path.selector );
        let result = path.value.label( key ).validate( path.get( value ) );
        if ( result.error ) {
          errors.push({
            key,
            message: result.error.message
          });
          if ( options.abortEarly ) {
            break;
          }
        } else {
          path.set( ret, result.value );
        }
      }
      if ( errors.length > 0 ) {
        return fail( errors, value );
      }
      return pass( ret );
    },

    pluck( selector, options ) {
      for ( let path of paths ) {
        if ( path.selector === selector ) {
          return path.value;
        } else if ( selector.startsWith( `${ path.selector }.` ) ) {
          return path.value.pluck( selector.substr( path.selector.length + 1 ) );
        }
      }
    },

    transform( transform ) {
      var keys = {};
      for ( let path of paths ) {
        path.set( keys, transform( path.value.transform( transform ) ) );
      }
      return this.factory( keys );
    }
  };
});
