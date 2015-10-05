import any from './any';
import fail from './fail';
import flatten from './flatten';
import pass from './pass';
import Path from './Path';
import schemaFromNode from './_schemaFromNode';

export default function object( shape ) {
  return any.extend({
    attributes: {
      type: 'object',
      paths: flatten( shape ).map( ({ selector, value }) => {
        return new Path( selector, schemaFromNode( value ) );
      })
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
        return fail( this, 'must be an object' );
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
    },

    transform( transform ) {
      var shape = {};
      for ( let path of this.attributes.paths ) {
        path.set( shape, transform( path.value.transform( transform ) ) );
      }
      return object( shape );
    }
  });
};
