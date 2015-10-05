import { object, number, string } from '../src';

describe( 'object( shape )', function() {
  describe( 'cast( any )', function() {
    it( 'should cast undefined to an empty shape', function() {
      expect(
        object({
          foo: number,
          bar: {
            baz: string
          }
        }).cast()
      ).to.eql({
        foo: 0,
        bar: {
          baz: ''
        }
      });
    });
  });

  describe( 'transform( function )', function() {
    it( 'should walk each path', function() {
      var foo = object({
        bar: number
      });
      foo = foo.transform( node => {
        if ( node === number ) {
          return string;
        } else {
          return node;
        }
      });
      var x = foo.cast({
        bar: 5
      });
      expect( x ).to.eql({
        bar: '5'
      });
    });
  });
});
