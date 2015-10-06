import any from './any';
import arrayOf from './arrayOf';
import boolean from './boolean';
import date from './date';
import isSchema from './isSchema';
import number from './number';
import object from './object';
import shape from './shape';
import string from './string';

export default function parse( value ) {
  if ( typeof value === 'function' ) {
    if ( value === String ) {
      value = string;
    } else if ( value === Boolean ) {
      value = boolean;
    } else if ( value === Number ) {
      value = number;
    } else if ( value === Object ) {
      value = object;
    } else if ( value === Date ) {
      value = date;
    } else {
      value = any.extend({
        cast: value
      });
    }
  } else if ( Array.isArray( value ) ) {
    value = arrayOf( parse( value[0] || any ) );
  } else if ( !isSchema( value ) ) {
    if ( typeof value === 'object' && value !== null ) {
      value = shape( value );
    } else {
      throw new Error( 'Cannot parse schema value.' );
    }
  }
  return value;
};
