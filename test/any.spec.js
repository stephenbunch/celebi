import { any } from '../src';

describe( 'any', function() {
  describe( 'label( string )', function() {
    it( 'should set the label', function() {
      expect( any.label( 'test' ).attributes.label ).to.equal( 'test' );
    });
  });
});
