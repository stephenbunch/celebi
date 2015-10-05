import Path from './Path';
import isSchema from './isSchema';

export default function( object ) {
  var done = [];
  var todo = Object.keys( object ).map( key => {
    return {
      selector: key,
      value: object[ key ]
    };
  });
  while ( todo.length > 0 ) {
    let item = todo.pop();
    if (
      item.value &&
      typeof item.value === 'object' &&
      !Array.isArray( item.value ) &&
      !isSchema( item.value )
    ) {
      todo = todo.concat(
        Object.keys( item.value ).map( key => {
          return {
            selector: item.selector + '.' + key,
            value: item.value[ key ]
          };
        })
      );
    } else {
      done.push( item );
    }
  }
  return done;
};
