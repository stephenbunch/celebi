import { nullableOf, number } from '../src';

describe( 'nullableOf( schema )', function() {
  describe( 'cast( any )', function() {
    it( 'should return null when value is null or undefined', function() {
      var schema = nullableOf( number );
      expect( schema.cast() ).to.equal( null );
      expect( schema.cast( null ) ).to.equal( null );
      expect( schema.cast( 2 ) ).to.equal( 2 );
    });
  });

  describe( 'validate( any )', function() {
    it( 'should pass validation when value is null or undefined', function() {
      var schema = nullableOf( number );
      expect( schema.validate().value ).to.equal( null );
      expect( schema.validate( null ).value ).to.equal( null );
      expect( schema.validate( 'foo' ).error ).to.be.instanceof( Error );
    });
  });
});
