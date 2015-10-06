import { constant } from '../src';

describe( 'constant', function() {
  describe( 'cast( any )', function() {
    it( 'should always return the specified value', function() {
      expect( constant( 'foo' ).cast( 'bar' ) ).to.equal( 'foo' );
    });
  });
});
