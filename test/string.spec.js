import { string } from '../src';

describe( 'string', function() {
  describe( 'cast( any )', function() {
    it( 'should cast falsey values to empty string', function() {
      expect( string.cast() ).to.equal( '' );
      expect( string.cast( false ) ).to.equal( '' );
      expect( string.cast( 0 ) ).to.equal( '' );
      expect( string.cast( null ) ).to.equal( '' );
      expect( string.cast( 'foo' ) ).to.equal( 'foo' );
    });
  });

  describe( 'validate( any )', function() {
    it( 'should return an error if value is not a string', function() {
      expect( string.validate( 2 ).error ).to.be.instanceof( Error );
    });

    it( 'should return an error if value is an empty string', function() {
      expect( string.validate( '' ).error ).to.be.instanceof( Error );
    });
  });

  describe( 'email()', function() {
    it( 'should return a new schema with email validation', function() {
      var schema = string.email();
      expect( schema.validate( '' ).error ).to.be.instanceof( Error );
      expect( schema.validate( 'foo' ).error ).to.be.instanceof( Error );
      expect( schema.validate( 'foo@foo.com' ).error ).to.equal( null );
    });
  });

  describe( 'lowerCase()', function() {
    it( 'should convert to lower case', function() {
      var schema = string.lowerCase();
      expect( schema.cast( 'FoO' ) ).to.equal( 'foo' );
      expect( schema.validate( 'FOO' ).value ).to.equal( 'foo' );
    });
  });

  describe( 'trim()', function() {
    it( 'should trim the value', function() {
      var schema = string.trim();
      expect( schema.cast( '  foo  ' ) ).to.equal( 'foo' );
      expect( schema.validate( '  foo  ' ).value ).to.equal( 'foo' );
    });
  });

  describe( 'default( value )', function() {
    it( 'should return default value if value is falsey', function() {
      var schema = string.default( 'foo' );
      expect( schema.cast() ).to.equal( 'foo' );
      expect( schema.cast( '' ) ).to.equal( 'foo' );
      expect( schema.cast( false ) ).to.equal( 'foo' );
      expect( schema.cast( null ) ).to.equal( 'foo' );
      expect( schema.cast( 0 ) ).to.equal( 'foo' );
      expect( schema.cast( 'bar' ) ).to.equal( 'bar' );
    });
  });

  describe( 'optional()', function() {
    it( 'false values should return undefined', function() {
      var schema = string.optional();
      expect( schema.cast() ).to.equal( undefined );
      expect( schema.cast( '' ) ).to.equal( undefined );
      expect( schema.cast( false ) ).to.equal( undefined );
      expect( schema.cast( 0 ) ).to.equal( undefined );
    });
  });
});
