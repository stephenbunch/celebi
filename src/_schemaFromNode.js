import any from './any';
import arrayOf from './arrayOf';
import boolean from './boolean';
import number from './number';
import isSchema from './isSchema';
import string from './string';

export default function schemaFromNode( value ) {
  if ( typeof value === 'function' ) {
    if ( value === String ) {
      value = string;
    } else if ( value === Boolean ) {
      value = boolean;
    } else if ( value === Number ) {
      value = number;
    } else if ( value === Object ) {
      value = any;
    } else {
      value = any.extend({
        cast: value
      });
    }
  } else if ( Array.isArray( value ) ) {
    console.log( 'test' );
    value = arrayOf( schemaFromNode( value[0] || any ) );
  } else if ( !isSchema( value ) ) {
    throw new Error( `Expected node "${ selector }" to be a schema or function.` );
  }
  return value;
};
