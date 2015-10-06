import { vm, number } from '../src';

describe( 'vm', function() {
  describe( 'cast( any )', function() {
    it( 'should return a view model', function() {
      var schema = vm({
        foo: number
      });
      var obj = schema.cast();
      expect( obj.foo ).to.equal( 0 );
      obj.foo = '3';
      expect( obj.foo ).to.equal( 3 );
    });
  });
});
