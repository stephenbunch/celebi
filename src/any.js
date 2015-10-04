export default {
  name: 'any',

  key( label = 'value' ) {
    return label;
  },

  cast( value ) {
    return value;
  },

  factory() {
    var schema = {};
    for ( let key in this ) {
      schema[ key ] = this[ key ];
    }
    return schema;
  },

  validate( value ) {
    return { error: null, value };
  },

  pluck() {},

  transform() {
    return this;
  },

  extend( spec ) {
    if ( typeof spec === 'function' ) {
      let factory = ( ...args ) => {
        var schema = this.extend( spec.apply( undefined, args ) );
        schema.factory = factory;
        return schema;
      };
      return factory;
    } else {
      var schema = {};
      for ( let key in this ) {
        schema[ key ] = this[ key ];
      }
      for ( let key in spec ) {
        schema[ key ] = spec[ key ];
      }
      return schema;
    }
  }
};
