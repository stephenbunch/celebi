import any from './any';
import fail from './fail';
import pass from './pass';
import parse from './parse';
import transformObject from './transformObject';
import isSchema from './isSchema';
import isPlainObject from './_isPlainObject';
import merge from './merge';
import transformObjectOutsideIn from './_transformObjectOutsideIn';

export default function shape( spec ) {
  if ( isSchema( spec ) ) {
    if ( spec.attributes.type === 'shape' ) {
      return shape( spec.attributes.keys );
    } else {
      throw new Error( 'Argument must be a plain object or a shape schema.' );
    }
  }
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
        var retval = {};
        if ( !isPlainObject( value ) ) {
          value = {};
        }
        for ( let key in this.attributes.keys ) {
          let val = this.attributes.keys[ key ].cast( value[ key ] );
          if ( val !== undefined ) {
            retval[ key ] = val;
          }
        }
        return retval;
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
            if ( result.value !== undefined ) {
              retval[ key ] = result.value;
            }
          }
        }
        if ( errors.length > 0 ) {
          return fail( this, errors );
        }
        return pass( retval );
      },

      path( selector ) {
        var [ top, ...rest ] = selector.split( '.' );
        for ( let key in this.attributes.keys ) {
          if ( key === top ) {
            return this.attributes.keys[ key ].path( rest.join( '.' ) );
          }
        }
        throw new Error( `Path "${ selector }" is invalid.` );
      },

      without( ...keys ) {
        var spec = {};
        for ( let key in this.attributes.keys ) {
          if ( keys.indexOf( key ) === -1 ) {
            spec[ key ] = this.attributes.keys[ key ];
          } else {
            // delete the key
            spec[ key ] = undefined;
          }
        }
        return this.extend({
          attributes: {
            keys: spec
          }
        });
      },

      pluck( ...keys ) {
        var spec = {};
        for ( let key in this.attributes.keys ) {
          if ( keys.indexOf( key ) > -1 ) {
            spec[ key ] = this.attributes.keys[ key ];
          } else {
            // delete the key
            spec[ key ] = undefined;
          }
        }
        return this.extend({
          attributes: {
            keys: spec
          }
        });
      },

      merge( spec ) {
        spec = transformObjectOutsideIn(
          shape( spec ),
          x => x.attributes.type === 'shape' ? x.attributes.keys : x
        );
        var self = transformObjectOutsideIn(
          this,
          x => x.attributes.type === 'shape' ? x.attributes.keys : x
        );
        return shape( merge( self, spec ) );
      },

      transform( transform ) {
        var spec = {};
        for ( let key in this.attributes.keys ) {
          spec[ key ] = transform( this.attributes.keys[ key ].transform( transform ) );
        }
        return this.extend({
          attributes: {
            keys: spec
          }
        });
      },

      unknown() {
        var parent = this.transform( schema => {
          if ( schema.attributes.type === 'shape' ) {
            return schema.unknown();
          } else {
            return schema;
          }
        });
        return parent.extend({
          attributes: {
            unknown: true
          },
          cast( value, options ) {
            var retval = parent.cast.call( this, value, options );
            for ( let key in value ) {
              if ( !this.attributes.keys[ key ] ) {
                retval[ key ] = value[ key ];
              }
            }
            return retval;
          },

          validate( value, options ) {
            var result = parent.validate.call( this, value, options );
            if ( result.value ) {
              for ( let key in value ) {
                if ( !this.attributes.keys[ key ] ) {
                  result.value[ key ] = value[ key ];
                }
              }
            }
            return result;
          }
        });
      }
    });
  });
};
