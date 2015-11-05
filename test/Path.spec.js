import { Path } from '../src';

describe( 'Path', function() {
  describe( '.override( obj, descriptor )', function() {
    it( 'should override the descriptor at the specified path', function() {
      var obj = {};
      var get = sinon.spy( function( $super ) {
        return $super();
      });
      var set = sinon.spy( function( value, $super ) {
        $super( value );
      });
      var restore = new Path( 'foo.bar.baz' ).override( obj, { get, set } );
      expect( obj.foo ).to.equal( undefined );
      obj.foo = {
        bar: {
          baz: 2
        }
      };
      expect( set ).to.have.been.calledWith( 2 );
      obj.foo = {};
      expect( set ).to.have.been.calledWith( undefined );
      obj.foo = {
        bar: {
          baz: 4
        }
      };
      expect( set ).to.have.been.calledWith( 4 );
      restore();
      expect( obj.foo.bar.baz ).to.equal( 4 );
      obj.foo = {};
      expect( obj.foo.bar ).to.equal( undefined );
      expect( set ).to.have.callCount( 3 );
    });

    it( 'should return an empty object if persist is enabled', function() {
      var obj = {};
      var restore = new Path( 'foo.bar.baz' ).override( obj, {
        get: () => 2,
        persist: true
      });
      expect( obj.foo.bar.baz ).to.equal( 2 );
      obj.foo = null;
      expect( obj.foo.bar.baz ).to.equal( 2 );
      restore();
      expect( obj.foo.bar.baz ).to.equal( 2 );
      obj.foo = null;
      expect( obj.foo ).to.equal( null );
    });
  });

  describe( '.get( obj )', function() {
    it( 'should get the value at the specified path or undefined', function() {
      var obj = { foo: { bar: { baz: 2 } } };
      expect( new Path( 'foo.bar.baz' ).get( obj ) ).to.equal( 2 );
      expect( new Path( 'foo.qux' ).get( obj ) ).to.be.undefined;
    });

    it( 'should return undefined on non-objects', function() {
      expect( new Path( 'foo.bar.baz' ).get( null ) ).to.be.undefined;
      expect( new Path( 'foo.bar.baz' ).get( 2 ) ).to.be.undefined;
    });
  });

  describe( '.set( obj, value )', function() {
    it( 'should set the value at the specified path even if intermediaries are missing', function() {
      var obj = {};
      new Path( 'foo.bar.baz' ).set( obj, 2 );
      expect( obj ).to.eql({
        foo: {
          bar: {
            baz: 2
          }
        }
      });
      var foo = obj.foo;
      new Path( 'foo.bar.baz' ).set( obj, 3 );
      expect( foo ).to.equal( obj.foo );
      expect( foo.bar ).to.equal( obj.foo.bar );
      expect( foo.bar.baz ).to.equal( 3 );
    });
  });

  describe( '.exists( obj )', function() {
    it( 'should return true if the path exists', function() {
      var obj = {};
      var path = new Path( 'foo.bar.baz' );
      expect( path.exists( obj ) ).to.equal( false );
      obj.foo = {};
      expect( path.exists( obj ) ).to.equal( false );
      obj.foo.bar = {};
      expect( path.exists( obj ) ).to.equal( false );
      obj.foo.bar.baz = undefined;
      expect( path.exists( obj ) ).to.equal( true );
    });
  });
});
