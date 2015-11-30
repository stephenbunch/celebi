import isSchema from './isSchema';

export default function( value ) {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray( value ) &&
    !isSchema( value )
  );
};
