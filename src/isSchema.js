export default function( value ) {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.cast === 'function'
  );
};
