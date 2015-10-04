import { string } from '../src';

describe( 'string', function() {
  describe( 'cast', function() {
    it( 'should cast falsey values to empty string', function() {
      expect( string.cast() ).to.equal( '' );
      expect( string.cast( false ) ).to.equal( '' );
      expect( string.cast( 0 ) ).to.equal( '' );
      expect( string.cast( null ) ).to.equal( '' );
      expect( string.cast( 'foo' ) ).to.equal( 'foo' );
    });
  });

  describe( 'validate', function() {
    it( 'should return an error if value is not a string', function() {
      expect( string.validate( 2 ).error ).to.be.instanceof( Error );
    });
  });
});
