import isSchema from './isSchema';
import shape from './shape';
import transformObject from './transformObject';

export default function vm( schema ) {
  if ( isSchema( schema ) ) {
    if ( schema.attributes.type !== 'shape' ) {
      throw new Error( 'Schema must be a shape.' );
    }
  } else {
    schema = shape( schema );
  }
  schema = schema.transform( function transform( node ) {
    if ( node.attributes.type === 'shape' ) {
      return vm( node );
    } else {
      return node;
    }
  });
  return schema.extend({
    attributes: {
      type: 'vm',
      keys: schema.attributes.keys
    },

    cast( source, options ) {
      if ( source === null || typeof source !== 'object' ) {
        source = {};
      }
      var model = {};
      for ( let key in this.attributes.keys ) {
        let _value = this.attributes.keys[ key ].cast( source[ key ] );
        Object.defineProperty( model, key, {
          enumerable: true,
          configurable: true,
          get: () => _value,
          set: value => {
            _value = this.attributes.keys[ key ].cast( value );
          }
        });
      }
      return model;
    }
  });
};
