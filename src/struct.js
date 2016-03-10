import shape from './shape';

export default function( spec ) {
  return shape( spec ).extend({
    attributes: {
      type: 'struct'
    }
  });
};
