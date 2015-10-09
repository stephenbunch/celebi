import { number, string, arrayOf, any } from '../src';

describe( 'arrayOf( schema )', function() {
  describe( 'cast( any )', function() {
    it( 'should cast non-array values to an empty array', function() {
      expect( arrayOf( any ).cast() ).to.eql( [] );
      expect( arrayOf( any ).cast( 2 ) ).to.eql( [] );
      expect( arrayOf( any ).cast( {} ) ).to.eql( [] );
    });

    it( 'should cast each item according to the supplied schema', function() {
      expect( arrayOf( number ).cast([ '5', '6' ]) ).to.eql([ 5, 6 ]);
      expect( arrayOf( string ).cast([ 5, 6 ]) ).to.eql([ '5', '6' ]);
    });
  });

  describe( 'validate( any )', function() {
    it( 'should return an error if value is not an array', function() {
      expect( arrayOf( any ).validate( 2 ).error ).to.be.instanceof( Error );
    });

    it( 'should validate each item and return any errors', function() {
      expect( arrayOf( string ).validate([ 2 ]).error ).to.be.instanceof( Error );
    });
  });

  describe( 'length( length )', function() {
    it( 'should limit the length of the array', function() {
      expect( arrayOf( number ).length( 2 ).cast([ '1', '2', '3' ]) ).to.eql([ 1, 2 ]);
    });

    it( 'should be transformable', function() {
      var a = arrayOf( number ).length( 2 );
      var b = a.transform( node => node === number ? string : number );
      expect( b.cast([ 1, 2, 3 ]) ).to.eql([ '1', '2' ]);
    });
  });
});
