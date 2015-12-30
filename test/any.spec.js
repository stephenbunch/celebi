import { any, shape } from '../src';

describe( 'any', function() {
  describe( 'label( string )', function() {
    it( 'should set the label', function() {
      expect( any.label( 'test' ).attributes.label ).to.equal( 'test' );
    });
  });

  describe( 'valid( values )', function() {
    it( 'should return a new schema whose values must equal one of the specified values', function() {
      var schema = any.valid([ 1, 2, 3 ]);
      expect( schema.validate( 1 ).error ).to.equal( null );
      expect( schema.validate( 4 ).error ).to.be.instanceof( Error );
    });
  });

  describe( 'attempt( value )', function() {
    it( 'should attempt to cast the given value or throw an error', function() {
      var schema = any.valid([ 1 ]);
      expect( () => {
        schema.attempt( 2 );
      }).to.throw().property( 'name', 'ValidationError' );
      expect( schema.attempt( 1 ) ).to.equal( 1 );
    });
  });

  describe( 'cast( any )', function() {
    it( 'should cast undefined to null', function() {
      expect( any.cast() ).to.equal( null );
    });
  });

  describe( 'default( value )', function() {
    it( 'should return default value if value is null or undefined', function() {
      var schema = any.default( 'foo' );
      expect( schema.cast() ).to.equal( 'foo' );
      expect( schema.cast( null ) ).to.equal( 'foo' );
      expect( schema.cast( false ) ).to.equal( false );
    });
  });

  describe( 'optional()', function() {
    it( 'should return undefined if the value is undefined', function() {
      var schema = shape({}).optional();
      expect( schema.cast() ).to.equal( undefined );
      expect( schema.cast( null ) ).to.eql( {} );
    });
  });
});
