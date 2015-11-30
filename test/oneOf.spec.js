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

  describe( 'path( selector )', function() {
    it( 'should get the schema at the specified path', function() {
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
      var schema = c.path( 'b.bar.baz' );
      expect( schema.cast( '2' ) ).to.equal( 2 );
    });
  });
});
