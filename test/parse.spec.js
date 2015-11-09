import { parse } from '../src';

describe( 'parse( value )', function() {
  it( 'should convert Number to number', function() {
    expect( parse( Number ).cast( '2' ) ).to.equal( 2 );
  });

  it( 'should convert String to string', function() {
    expect( parse( String ).cast( 2 ) ).to.equal( '2' );
  });

  it( 'should parse shapes', function() {
    expect( parse({ foo: Number }).cast() ).to.eql({
      foo: 0
    });
  });

  it( 'should parse arrays', function() {
    expect( parse([ Number ]).cast([ '2', '5' ]) ).to.eql([ 2, 5 ]);
  });

  it( 'should parse function types', function() {
    expect( parse( Function ).cast( x => x )( 2 ) ).to.equal( 2 );
  });
});
