import { object, number, string } from '../src';

describe( 'object', function() {
  it( 'should cast to a default value', function() {
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

  it( 'should transform', function() {
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
