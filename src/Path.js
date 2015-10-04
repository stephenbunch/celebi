import overrideProperty from './util/overrideProperty';

export default class Path {
  constructor( selector, value ) {
    this.selector = selector;
    this.segments = selector.split( '.' );
    this.value = value;
  }

  override( obj, descriptor ) {
    this._validateObject( obj );
    var restore = [];
    var teardown = index => {
      restore.splice( index ).reverse().forEach( func => func() );
    };
    var setup = ( index, node, set ) => {
      // Remove all the property overrides from this path segment and down.
      teardown( index );
      // Setup new overrides as long as there's a valid node in the path.
      var i = index;
      for ( ; i < this.segments.length - 1; i++ ) {
        if ( !this._isValidObject( node ) ) {
          break;
        }
        let prop = this.segments[ i ];
        if ( descriptor.persist && !this._isValidObject( node[ prop ] ) ) {
          node[ prop ] = {};
        }
        restore[ i ] = overrideProperty( node, prop, {
          configurable: true,
          enumerable: true,
          get: ( _super ) => {
            return _super();
          },
          set: ( value, _super ) => {
            if ( value !== _super() ) {
              if ( descriptor.persist && !this._isValidObject( value ) ) {
                value = {};
              }
              _super( value );
              setup( index + 1, value, true );
            }
          }
        });
        node = node[ prop ];
      }
      // Setup the last segment.
      if ( i === this.segments.length - 1 && this._isValidObject( node ) ) {
        let prop = this.segments[ i ];

        // If this is a set operation, run the value through the setter to
        // trigger any handlers.
        let value;
        let applySetter = false;
        if ( set && this._isPropertyWritable( node, prop ) ) {
          value = node[ prop ];
          applySetter = true;
        }

        restore[ i ] = overrideProperty( node, prop, {
          configurable: true,
          enumerable: true,
          get: descriptor.get,
          set: descriptor.set
        });

        if ( applySetter ) {
          node[ prop ] = value;
        }
      } else if ( set && descriptor.set ) {
        // This actually doesn't make sense in the context of overriding a
        // property setter since the owning object doesn't exist. But the
        // purpose of this library is to be able to override the path as a
        // whole, so when the owning object becomes undefined, it makes sense to
        // pass undefined to the setter since the value at that particular path
        // is now undefined.
        descriptor.set( undefined, () => {} );
      }
    };
    setup( 0, obj, false );
    return function() {
      teardown( 0 );
    }
  }

  get( obj ) {
    for ( let segment of this.segments ) {
      if ( typeof obj !== 'object' || obj === null ) {
        return;
      }
      obj = obj[ segment ];
    }
    return obj;
  }

  set( obj, value ) {
    if ( typeof obj !== 'object' || obj === null ) {
      return;
    }
    for ( let segment of this.segments.slice( 0, -1 ) ) {
      let value = obj[ segment ];
      if ( typeof value !== 'object' || value === null ) {
        value = obj[ segment ] = {};
      }
      obj = value;
    }
    obj[ this.segments[ this.segments.length - 1 ] ] = value;
  }

  exists( obj ) {
    for ( let segment of this.segments ) {
      if ( typeof obj !== 'object' || obj === null ) {
        return false;
      }
      if ( segment in obj ) {
        obj = obj[ segment ];
      } else {
        return false;
      }
    }
    return true;
  }

  _validateObject( obj ) {
    if ( obj === null ) {
      throw new Error( 'Object cannot be null.' );
    }
    if ( typeof obj !== 'object' ) {
      throw new Error( 'First argument must be an object.' );
    }
  }

  _isValidObject( obj ) {
    return typeof obj === 'object' && obj !== null;
  }

  _isPropertyWritable( obj, prop ) {
    var descriptor = Object.getOwnPropertyDescriptor( obj, prop );
    return !!( descriptor && ( descriptor.set || descriptor.writable ) );
  }
};
