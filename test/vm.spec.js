import { vm, number, shape } from '../src';

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

    it( 'should permeate nested schemas', function() {
      var schema = vm({
        foo: {
          bar: number
        },
        baz: shape({
          qux: number
        })
      });
      var obj = schema.cast();
      obj.foo.bar = '4';
      obj.baz.qux = '5';
      expect( obj.foo.bar ).to.equal( 4 );
      expect( obj.baz.qux ).to.equal( 5 );
    });

    it( 'should work with subpaths', function() {
      var schema = vm({
        foo: {
          bar: {
            baz: number
          }
        }
      });
      var obj = schema.cast();
      obj.foo.bar = {
        baz: '2'
      };
      expect( obj.foo.bar.baz ).to.equal( 2 );
    });
  });
});
