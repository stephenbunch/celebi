import { any } from '../src';

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
});
