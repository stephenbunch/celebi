import merge from 'lodash.merge';

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

  cast( value ) {
    return value;
  },

  validate( value ) {
    return { error: null, value };
  },

  pluck( selector, options ) {},

  extend( spec ) {
    return merge( {}, this, spec );
  }
};
