import { object, number, string } from '../src';

describe( 'object( shape )', function() {
  describe( 'cast( any )', function() {
    it( 'should cast undefined to an empty shape', function() {
      var schema = object({
        foo: number,
        bar: {
          baz: string
        }
      });
      expect( schema.cast() ).to.eql({
        foo: 0,
        bar: {
          baz: ''
        }
      });
    });

    it( 'should cast sub-schemas', function() {
      var a = object({
        foo: number
      })
      var b = object({
        bar: a
      });
      expect( b.cast() ).to.eql({
        bar: {
          foo: 0
        }
      });
    });

    it( 'should auto-convert type functions to schemas', function() {
      var schema = object({
        foo: Number,
        bar: () => 'baz'
      });
      expect( schema.cast() ).to.eql({
        foo: 0,
        bar: 'baz'
      });
      schema = object({
        foo: [ String ]
      });
      expect(
        schema.cast({
          foo: [ 2, 5 ]
        })
      ).to.eql({
        foo: [ '2', '5' ]
      });
    });
  });

  describe( 'transform( transform )', function() {
    it( 'should transform the shape', function() {
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
