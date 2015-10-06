import Path from './Path';
import isSchema from './isSchema';
import shape from './shape';

export default function vm( schema ) {
  if ( isSchema( schema ) ) {
    if ( schema.attributes.type !== 'shape' ) {
      throw new Error( 'Schema must be a shape.' );
    }
  } else {
    schema = shape( schema );
  }
  return schema.extend({
    attributes: {
      type: 'vm',
      paths: schema.attributes.paths.map( path => {
        if ( path.value.attributes.type === 'object' ) {
          return new Path( path.selector, vm( path.value ) );
        } else {
          return new Path( path.selector, path.value );
        }
      })
    },

    cast( value, options ) {
      if ( value === null || typeof value !== 'object' ) {
        value = {};
      }
      var retval = {};
      for ( let path of this.attributes.paths ) {
        let pathValue = path.value.cast( path.get( value ) );
        path.override( retval, {
          initialize: false,
          persist: true,
          get: () => pathValue,
          set: value => {
            pathValue = path.value.cast( value );
          }
        });
      }
      return retval;
    }
  });
};
