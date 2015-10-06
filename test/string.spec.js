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
});
