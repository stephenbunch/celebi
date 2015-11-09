import { func } from '../src';

describe( 'func', function() {
  describe( 'cast', function() {
    it( 'should return an empty function if value is not a function', function() {
      expect( func.cast()() ).to.equal( undefined );
      expect( func.cast( x => x )( 2 ) ).to.equal( 2 );
    });
  });
});
