import { number } from '../src';

describe( 'number', function() {
  describe( 'cast', function() {
    it( 'should cast non-number values to 0', function() {
      expect( number.cast( 'foo' ) ).to.equal( 0 );
    });
  });

  describe( 'validate', function() {
    it( 'should return an error if value is not a number', function() {
      expect( number.validate( 'foo' ).error ).to.be.instanceof( Error );
    });
  });
});
