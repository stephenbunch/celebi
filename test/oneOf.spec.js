import { oneOf, shape, string, number } from '../src';

describe( 'oneOf( discriminator, schemas )', function() {
  describe( 'cast( any )', function() {
    it( 'should cast according to the discriminator or return undefined', function() {
      var a = shape({
        type: string,
        foo: number
      });
      var b = shape({
        type: string,
        bar: number
      });
      var c = oneOf( 'type', { a, b } );
      expect( c.cast({ type: 'a' }) ).to.eql({
        type: 'a',
        foo: 0
      });
      expect( c.cast({ type: 'b' }) ).to.eql({
        type: 'b',
        bar: 0
      });
      expect( c.cast() ).to.equal( undefined );
    });
  });

  describe( 'pluck( selector, options )', function() {
    it( 'should pluck the schema according to the specified value', function() {
      var a = shape({
        type: string,
        foo: {
          bar: number
        }
      });
      var b = shape({
        type: string,
        bar: {
          baz: number
        }
      });
      var c = oneOf( 'type', { a, b } );
      var schema = c.pluck( 'bar.baz', {
        discriminators: {
          'bar.baz': 'b'
        }
      });
      expect( schema.cast( '2' ) ).to.equal( 2 );
    });
  });
});
