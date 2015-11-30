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
        if ( node.attributes.type === 'number' ) {
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

  describe( 'path( selector )', function() {
    it( 'should get the schema at the specified path', function() {
      var schema = shape({
        foo: {
          bar: number
        }
      });
      var bar = schema.path( 'foo.bar' );
      expect( bar.cast( '2' ) ).to.equal( 2 );
    });
  });

  describe( 'without( ...keys )', function() {
    it( 'should return a new shape without the specified fields', function() {
      var schema = shape({
        foo: number,
        bar: number,
        baz: number
      }).without( 'bar', 'baz' );
      expect( schema.cast({ foo: '2', bar: '3', baz: '5' }) ).to.eql({
        foo: 2
      });
    });
  });

  describe( 'pluck( ...keys )', function() {
    it( 'should return a new shape with only the specified fields', function() {
      var schema = shape({
        foo: number,
        bar: number,
        baz: number
      }).pluck( 'foo' );
      expect( schema.cast({ foo: '2', bar: '3', baz: '5' }) ).to.eql({
        foo: 2
      });
    });
  });

  describe( 'unknown()', function() {
    it( 'should return a new shape that keeps unknown paths', function() {
      var schema = shape({
        foo: {
          bar: number
        }
      }).unknown();
      var obj = schema.cast({
        foo: {
          bar: '2',
          baz: 3
        },
        qux: '4'
      });
      expect( obj ).to.eql({
        foo: {
          bar: 2,
          baz: 3
        },
        qux: '4'
      });
    });

    it( 'should be transformable', function() {
      var a = shape({
        foo: number
      }).unknown();
      var b = a.transform( node => node.attributes.type === 'number' ? string : number );
      var obj = b.cast({
        foo: 2,
        bar: 3
      });
      expect( obj ).to.eql({
        foo: '2',
        bar: 3
      });
    });
  });
});
