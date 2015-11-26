import any from './any';
import fail from './fail';
import pass from './pass';
import parse from './parse';
import transformObject from './transformObject';

export default function shape( spec ) {
  return transformObject( spec, function( spec ) {
    for ( let key in spec ) {
      spec[ key ] = parse( spec[ key ] );
    }
    return any.extend({
      attributes: {
        type: 'shape',
        keys: spec
      },

      cast( value, options ) {
        if ( value === null || typeof value !== 'object' ) {
          value = {};
        }
        for ( let key in this.attributes.keys ) {
          value[ key ] = this.attributes.keys[ key ].cast( value[ key ] );
        }
        return value;
      },

      validate( value, options = {} ) {
        if ( value === null || typeof value !== 'object' ) {
          return fail( this, 'must be an object' );
        }
        var errors = [];
        var retval = {};
        for ( let key in this.attributes.keys ) {
          let label = this.attributes.keys[ key ].attributes.label || key;
          let result = this.attributes.keys[ key ].label( label ).validate( value[ key ], options );
          if ( result.error ) {
            errors.push({
              key: key,
              message: result.error.message
            });
            if ( options.abortEarly ) {
              break;
            }
          } else {
            retval[ key ] = result.value;
          }
        }
        if ( errors.length > 0 ) {
          return fail( this, errors );
        }
        return pass( retval );
      },

      pluck( selector, options ) {
        for ( let key in this.attributes.keys ) {
          if ( key === selector ) {
            return this.attributes.keys[ key ];
          } else if ( selector.startsWith( `${ key }.` ) ) {
            return this.attributes.keys[ key ].pluck(
              selector.substr( key.length + 1 ),
              options
            );
          }
        }
      },

      transform( transform ) {
        var spec = {};
        for ( let key in this.attributes.keys ) {
          spec[ key ] = transform( this.attributes.keys[ key ].transform( transform ) );
        }
        return shape( spec );
      },

      unknown() {
        var parent = this;
        return this.extend({
          cast( value, options ) {
            var obj = parent.cast( value, options );
            for ( let key in value ) {
              if ( !this.attributes.keys[ key ] ) {
                obj[ key ] = value[ key ];
              }
            }
            return obj;
          },

          validate( value, options ) {
            var result = parent.validate( value, options );
            if ( result.value ) {
              for ( let key in value ) {
                if ( !this.attributes.keys[ key ] ) {
                  result.value[ key ] = value[ key ];
                }
              }
            }
            return result;
          },

          transform( transform ) {
            return parent.transform( transform ).unknown();
          }
        });
      }
    });
  });
};
