import any from './any';

export default function( value ) {
  return any.extend({
    cast() {
      return value;
    },

    validate() {
      return {
        result: value,
        error: null
      };
    }
  })
};
