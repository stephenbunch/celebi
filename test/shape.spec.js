import { shape, number, string } from '../src';

describe( 'shape( spec )', function() {
  describe( 'cast( any )', function() {
    it( 'should cast undefined to an empty shape', function() {
      var schema = shape({
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
      var a = shape({
        foo: number
      })
      var b = shape({
        bar: a
      });
      expect( b.cast() ).to.eql({
        bar: {
          foo: 0
        }
      });
    });

    it( 'should auto-convert type functions to schemas', function() {
      var schema = shape({
        foo: Number,
        bar: () => 'baz'
      });
      expect( schema.cast() ).to.eql({
        foo: 0,
        bar: 'baz'
      });
      schema = shape({
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
      var foo = shape({
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

  describe( 'pluck( selector )', function() {
    it( 'should get the schema at the specified path', function() {
      var schema = shape({
        foo: {
          bar: number
        }
      });
      var bar = schema.pluck( 'foo.bar' );
      expect( bar.cast( '2' ) ).to.equal( 2 );
    });
  });
});