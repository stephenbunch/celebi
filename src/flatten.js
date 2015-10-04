import Path from './Path';

export default function( object ) {
  var done = [];
  var todo = Object.keys( object ).map( key => {
    return {
      path: key,
      value: object[ key ]
    };
  });
  while ( todo.length > 0 ) {
    let item = todo.pop();
    if (
      item.value &&
      typeof item.value === 'object' &&
      typeof item.value.cast !== 'function'
    ) {
      todo = todo.concat(
        Object.keys( item.value ).map( key => {
          return {
            path: item.path + '.' + key,
            value: item.value[ key ]
          };
        })
      );
    } else {
      done.push( item );
    }
  }
  return done.map( x => new Path( x.path, x.value ) );
};
