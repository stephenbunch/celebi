import { date } from '../src';

describe( 'date', function() {
  describe( 'cast', function() {
    it( 'should not return a new date instance if an instance is already provided', function() {
      var value = new Date();
      expect( date.cast( value ) ).to.equal( value );
    });
  });
});
