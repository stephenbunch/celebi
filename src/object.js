import any from './any';
import flatten from './flatten';
import pass from './pass';
import fail from './fail';

export default function object( shape ) {
  return any.extend({
    attributes: {
      type: 'object',
      paths: flatten( shape )
    },

    cast( value, options ) {
      if ( value === null || typeof value !== 'object' ) {
        value = {};
      }
      for ( let path of this.attributes.paths ) {
        path.set( value, path.value.cast( path.get( value ) ) );
      }
      return value;
    },

    validate( value, options = {} ) {
      if ( value === null || typeof value !== 'object' ) {
        return fail( `"${ this.attributes.label || 'value' }" must be an object` );
      }
      var errors = [];
      var retval = {};
      for ( let path of this.attributes.paths ) {
        let key = path.value.attributes.label || path.selector;
        let result = path.value.label( key ).validate( path.get( value ), options );
        if ( result.error ) {
          errors.push({
            key,
            message: result.error.message
          });
          if ( options.abortEarly ) {
            break;
          }
        } else {
          path.set( retval, result.value );
        }
      }
      if ( errors.length > 0 ) {
        return fail( errors );
      }
      return pass( retval );
    },

    pluck( selector, options ) {
      for ( let path of this.attributes.paths ) {
        if ( path.selector === selector ) {
          return path.value;
        } else if ( selector.startsWith( `${ path.selector }.` ) ) {
          return path.value.pluck(
            selector.substr( path.selector.length + 1 ),
            options
          );
        }
      }
    }
  });
};
