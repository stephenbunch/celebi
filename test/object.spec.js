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
});
