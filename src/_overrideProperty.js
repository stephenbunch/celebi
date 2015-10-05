import assign from 'lodash.assign';

export default function( obj, prop, descriptor ) {
  var value;
  var superDescriptor = Object.getOwnPropertyDescriptor( obj, prop );

  if ( !superDescriptor || superDescriptor.hasOwnProperty( 'value' ) ) {
    value = obj[ prop ];
  }

  var superGet =
    superDescriptor &&
    superDescriptor.get &&
    superDescriptor.get.bind( obj ) ||
    function() {
      return value;
    };

  var superSet =
    superDescriptor &&
    superDescriptor.set &&
    superDescriptor.set.bind( obj ) ||
    function( newval ) {
      value = newval;
    };

  function $super( newval ) {
    if ( arguments.length ) {
      superSet( newval );
    }
    return superGet();
  }

  function override( accessor ) {
    return function( ...args ) {
      return accessor.apply( this, args.concat([ $super ]) );
    };
  }

  var overrideGet = descriptor.get && override( descriptor.get );
  var overrideSet = descriptor.set && override( descriptor.set );

  var definition = assign( {}, descriptor );

  definition.get = definition.get && function() {
    return overrideGet ? overrideGet.call( this ) : superGet();
  } || undefined;

  definition.set = definition.set && function( newval ) {
    overrideSet ? overrideSet.call( this, newval ) : superSet( newval );
  } || undefined;

  Object.defineProperty( obj, prop, definition );

  return function() {
    if ( superDescriptor ) {
      if ( superDescriptor.hasOwnProperty( 'value' ) ) {
        superDescriptor.value = value;
      }
      Object.defineProperty( obj, prop, superDescriptor );
    } else {
      var curval = obj[ prop ];
      delete obj[ prop ];
      obj[ prop ] = curval;
    }
  };
};
