import { number, string, arrayOf, any } from '../src';

describe( 'arrayOf', function() {
  describe( 'cast', function() {
    it( 'should cast non-array values to an empty array', function() {
      expect( arrayOf( any ).cast() ).to.eql( [] );
      expect( arrayOf( any ).cast( 2 ) ).to.eql( [] );
      expect( arrayOf( any ).cast( {} ) ).to.eql( [] );
    });

    it( 'should cast each item according to the supplied schema', function() {
      expect( arrayOf( number ).cast([ '5' ]) ).to.eql([ 5 ]);
      expect( arrayOf( string ).cast([ 5 ]) ).to.eql([ '5' ]);
    });
  });

  describe( 'validate', function() {
    it( 'should return an error if value is not an array', function() {
      expect( arrayOf( any ).validate( 2 ).error ).to.be.instanceof( Error );
    });

    it( 'should validate each item and return any errors', function() {
      expect( arrayOf( string ).validate([ 2 ]).error ).to.be.instanceof( Error );
    });
  });
});
