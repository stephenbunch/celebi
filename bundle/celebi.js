(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Celebi = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isSchema = require('./isSchema');

var _isSchema2 = _interopRequireDefault(_isSchema);

exports['default'] = function (value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && !(0, _isSchema2['default'])(value);
};

;
module.exports = exports['default'];
},{"./isSchema":11}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = transformObjectOutsideIn;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _isPlainObject = require('./_isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

/**
 * Transforms an object from the outside in. Nodes of objects passed to the
 * replacer function have not been transformed. The object is transformed first,
 * and if the result is a plain object, its nodes are also transformed.
 */

function transformObjectOutsideIn(object, replace) {
  object = replace(object);
  if ((0, _isPlainObject2['default'])(object)) {
    return Object.keys(object).reduce(function (result, key) {
      return _extends({}, result, _defineProperty({}, key, transformObjectOutsideIn(object[key], replace)));
    }, {});
  } else {
    return object;
  }
}

;
module.exports = exports['default'];
},{"./_isPlainObject":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

var _merge = require('./merge');

var _merge2 = _interopRequireDefault(_merge);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

exports['default'] = {
  attributes: {
    type: 'any'
  },

  label: function label(name) {
    return this.extend({
      attributes: {
        label: name
      }
    });
  },

  cast: function cast(value, options) {
    if (value === undefined) {
      return null;
    } else {
      return value;
    }
  },

  attempt: function attempt(value, options) {
    var result = this.validate(value, options);
    if (result.error) {
      throw result.error;
    } else {
      return result.value;
    }
  },

  validate: function validate(value, options) {
    return { error: null, value: value };
  },

  path: function path(selector) {
    return this;
  },

  extend: function extend(spec) {
    return (0, _merge2['default'])({}, this, spec);
  },

  transform: function transform(_transform) {
    return this;
  },

  valid: function valid(values) {
    return this.extend({
      validate: function validate(value) {
        if (values.indexOf(value) === -1) {
          return (0, _fail2['default'])(this, 'is invalid');
        } else {
          return (0, _pass2['default'])(value);
        }
      }
    });
  },

  'default': function _default(defaultValue) {
    var parent = this;
    return this.extend({
      cast: function cast(value, options) {
        if (value === null || value === undefined) {
          return parent.cast.call(this, defaultValue, options);
        } else {
          return parent.cast.call(this, value, options);
        }
      },
      validate: function validate(value, options) {
        if (value === null || value === undefined) {
          return parent.validate.call(this, defaultValue, options);
        } else {
          return parent.validate.call(this, value, options);
        }
      }
    });
  },

  optional: function optional() {
    var parent = this;
    return this.extend({
      cast: function cast(value, options) {
        if (value === undefined) {
          return undefined;
        } else {
          return parent.cast.call(this, value, options);
        }
      },
      validate: function validate(value, options) {
        if (value === undefined) {
          return (0, _pass2['default'])(undefined);
        } else {
          return parent.validate.call(this, value, options);
        }
      }
    });
  }
};
module.exports = exports['default'];
},{"./fail":8,"./merge":12,"./pass":18}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = arrayOf;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

function arrayOf(schema) {
  schema = (0, _parse2['default'])(schema);
  return _any2['default'].extend({
    attributes: {
      type: 'array',
      schema: schema
    },

    cast: function cast(value, options) {
      if (Array.isArray(value)) {
        return value.map(function (x) {
          return schema.cast(x, options);
        });
      } else {
        return [];
      }
    },

    path: function path(selector) {
      return schema.path(selector);
    },

    validate: function validate(value) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if (!Array.isArray(value)) {
        return (0, _fail2['default'])(this, 'must be an array');
      } else {
        var retval = [];
        var errors = [];
        for (var i = 0; i < value.length; i++) {
          var item = value[i];
          var result = schema.label(schema.attributes.label || 'item ' + i).validate(item, options);
          if (result.error) {
            errors.push({
              key: i,
              message: result.error.message
            });
            if (options.abortEarly) {
              break;
            }
          } else {
            retval.push(result.value);
          }
        }
        if (errors.length > 0) {
          return (0, _fail2['default'])(this, errors);
        } else {
          return (0, _pass2['default'])(retval);
        }
      }
    },

    transform: function transform(_transform) {
      return arrayOf(_transform(schema));
    },

    length: function length(_length) {
      var parent = this;
      return this.extend({
        cast: function cast(value, options) {
          return parent.cast(value, options).slice(0, 2);
        },

        validate: function validate(value, options) {
          var result = parent.validate(value, options);
          if (result.error) {
            return result;
          } else {
            result.value = result.value.slice(0, 2);
            return result;
          }
        },

        transform: function transform(_transform2) {
          return parent.transform(_transform2).length(_length);
        }
      });
    }
  });
}

;
module.exports = exports['default'];
},{"./any":3,"./fail":8,"./parse":17,"./pass":18}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

exports['default'] = _any2['default'].extend({
  attributes: {
    type: 'boolean'
  },

  cast: function cast(value) {
    if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    } else {
      value = !!value;
    }
    return value;
  },

  validate: function validate(value) {
    if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    }
    if (typeof value !== 'boolean') {
      return (0, _fail2['default'])(this, 'must be a boolean');
    }
    return (0, _pass2['default'])(value);
  }
});
module.exports = exports['default'];
},{"./any":3,"./fail":8,"./pass":18}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

exports['default'] = function (value) {
  return _any2['default'].extend({
    cast: function cast() {
      return value;
    },

    validate: function validate() {
      return {
        result: value,
        error: null
      };
    }
  });
};

;
module.exports = exports['default'];
},{"./any":3}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

exports['default'] = _any2['default'].extend({
  cast: function cast(value) {
    if (value instanceof Date) {
      return value;
    } else {
      return new Date(value || null);
    }
  },

  validate: function validate(value) {
    if (!(value instanceof Date)) {
      value = new Date(value);
    }
    if (isNaN(value)) {
      return (0, _fail2['default'])(this, 'must be a valid date');
    } else {
      return (0, _pass2['default'])(value);
    }
  }
});
module.exports = exports['default'];
},{"./any":3,"./fail":8,"./pass":18}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isSchema = require('./isSchema');

var _isSchema2 = _interopRequireDefault(_isSchema);

exports['default'] = function (schema, reason) {
  if (!(0, _isSchema2['default'])(schema)) {
    throw new Error('Expected first argument to be a schema.');
  }
  var error = new Error();
  error.name = 'ValidationError';
  if (typeof reason === 'string') {
    error.message = '"' + (schema.attributes.label || 'value') + '" ' + reason;
  } else if (Array.isArray(reason)) {
    error.message = '"' + (schema.attributes.label || 'value') + '" fails because [' + reason[0].message + ']';
    error.details = reason;
  } else {
    throw new Error('Expected failure reason to be a string, error, or an array.');
  }
  return {
    error: error,
    value: null
  };
};

;
module.exports = exports['default'];
},{"./isSchema":11}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

exports['default'] = _any2['default'].extend({
  attributes: {
    type: 'function'
  },

  cast: function cast(value) {
    if (typeof value === 'function') {
      return value;
    } else {
      return function () {};
    }
  },

  validate: function validate(value) {
    if (typeof value !== 'function') {
      return (0, _fail2['default'])(this, 'must be a function');
    } else {
      return (0, _pass2['default'])(value);
    }
  }
});
module.exports = exports['default'];
},{"./any":3,"./fail":8,"./pass":18}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _arrayOf = require('./arrayOf');

var _arrayOf2 = _interopRequireDefault(_arrayOf);

var _boolean = require('./boolean');

var _boolean2 = _interopRequireDefault(_boolean);

var _constant = require('./constant');

var _constant2 = _interopRequireDefault(_constant);

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

var _func = require('./func');

var _func2 = _interopRequireDefault(_func);

var _isSchema = require('./isSchema');

var _isSchema2 = _interopRequireDefault(_isSchema);

var _nullableOf = require('./nullableOf');

var _nullableOf2 = _interopRequireDefault(_nullableOf);

var _number = require('./number');

var _number2 = _interopRequireDefault(_number);

var _object = require('./object');

var _object2 = _interopRequireDefault(_object);

var _oneOf = require('./oneOf');

var _oneOf2 = _interopRequireDefault(_oneOf);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

var _shape = require('./shape');

var _shape2 = _interopRequireDefault(_shape);

var _string = require('./string');

var _string2 = _interopRequireDefault(_string);

var _transformObject = require('./transformObject');

var _transformObject2 = _interopRequireDefault(_transformObject);

var _vm = require('./vm');

var _vm2 = _interopRequireDefault(_vm);

exports['default'] = {
  any: _any2['default'],
  arrayOf: _arrayOf2['default'],
  boolean: _boolean2['default'],
  constant: _constant2['default'],
  date: _date2['default'],
  fail: _fail2['default'],
  func: _func2['default'],
  isSchema: _isSchema2['default'],
  nullableOf: _nullableOf2['default'],
  number: _number2['default'],
  object: _object2['default'],
  oneOf: _oneOf2['default'],
  parse: _parse2['default'],
  pass: _pass2['default'],
  shape: _shape2['default'],
  string: _string2['default'],
  transformObject: _transformObject2['default'],
  vm: _vm2['default']
};
module.exports = exports['default'];
},{"./any":3,"./arrayOf":4,"./boolean":5,"./constant":6,"./date":7,"./fail":8,"./func":9,"./isSchema":11,"./nullableOf":13,"./number":14,"./object":15,"./oneOf":16,"./parse":17,"./pass":18,"./shape":19,"./string":20,"./transformObject":21,"./vm":22}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (value) {
  return value && typeof value === 'object' && typeof value.cast === 'function';
};

;
module.exports = exports['default'];
},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = merge;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isPlainObject = require('./_isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function merge(object) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    for (var _iterator = sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var source = _step.value;

      for (var key in source) {
        if (source[key] === undefined) {
          delete object[key];
        } else if ((0, _isPlainObject2['default'])(source[key]) && (0, _isPlainObject2['default'])(object[key])) {
          object[key] = merge({}, object[key], source[key]);
        } else {
          object[key] = source[key];
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return object;
}

;
module.exports = exports['default'];
},{"./_isPlainObject":1}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = nullableOf;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

function nullableOf(schema) {
  schema = (0, _parse2['default'])(schema);
  return _any2['default'].extend({
    attributes: {
      type: 'nullable',
      schema: schema
    },

    cast: function cast(value, options) {
      if (value === undefined || value === null) {
        return null;
      } else {
        return schema.cast(value, options);
      }
    },

    validate: function validate(value, options) {
      if (value === undefined || value === null) {
        return (0, _pass2['default'])(null);
      } else {
        return schema.validate(value, options);
      }
    },

    path: function path(selector) {
      return schema.path(selector);
    },

    transform: function transform(_transform) {
      return nullableOf(_transform(schema));
    }
  });
}

;
module.exports = exports['default'];
},{"./any":3,"./parse":17,"./pass":18}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

exports['default'] = _any2['default'].extend({
  attributes: {
    type: 'number'
  },

  cast: function cast(value) {
    value = Number(value);
    if (isNaN(value)) {
      return 0;
    }
    return value;
  },

  validate: function validate(value) {
    if (isNaN(value)) {
      return (0, _fail2['default'])(this, 'must be a number');
    }
    return (0, _pass2['default'])(Number(value));
  }
});
module.exports = exports['default'];
},{"./any":3,"./fail":8,"./pass":18}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

exports['default'] = _any2['default'].extend({
  attributes: {
    title: 'object'
  },

  cast: function cast(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return {};
    } else {
      return value;
    }
  },

  validate: function validate(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return (0, _fail2['default'])(this, 'must be an object');
    } else {
      return (0, _pass2['default'])(value);
    }
  }
});
module.exports = exports['default'];
},{"./any":3,"./fail":8,"./pass":18}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = oneOf;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

function oneOf(discriminator, schemas) {
  for (var _key in schemas) {
    schemas[_key] = (0, _parse2['default'])(schemas[_key]);
  }
  return _any2['default'].extend({
    attributes: {
      type: 'discriminator',
      schemas: schemas
    },

    path: function path(selector) {
      var _selector$split = selector.split('.');

      var _selector$split2 = _toArray(_selector$split);

      var discriminator = _selector$split2[0];

      var rest = _selector$split2.slice(1);

      if (!schemas[discriminator]) {
        var keys = Object.keys(this.attributes.schemas);
        throw new Error('Discriminator at "' + selector + '" must be one of ' + keys.join(', '));
      }
      return schemas[discriminator].path(rest.join('.'));
    },

    cast: function cast(value, options) {
      if (typeof value === 'object' && value !== null && schemas[value[discriminator]]) {
        return schemas[value[discriminator]].cast(value);
      }
    },

    validate: function validate(value, options) {
      if (typeof value !== 'object' || value === null) {
        return (0, _fail2['default'])(this, 'must be an object');
      }
      if (!schemas[value[discriminator]]) {
        var keys = Object.keys(this.attributes.schemas);
        return (0, _fail2['default'])(this, discriminator + ' must be one of ' + keys.join(', '));
      }
      return schemas[value[discriminator]].cast(value, options);
    },

    transform: function transform(_transform) {
      var schemas = {};
      for (key in this.attributes.schemas) {
        schemas[key] = _transform(this.attributes.schemas[key]);
      }
      return oneOf(discriminator, schemas);
    }
  });
}

;
module.exports = exports['default'];
},{"./any":3,"./fail":8,"./parse":17}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = parse;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _arrayOf = require('./arrayOf');

var _arrayOf2 = _interopRequireDefault(_arrayOf);

var _boolean = require('./boolean');

var _boolean2 = _interopRequireDefault(_boolean);

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

var _func = require('./func');

var _func2 = _interopRequireDefault(_func);

var _isSchema = require('./isSchema');

var _isSchema2 = _interopRequireDefault(_isSchema);

var _number = require('./number');

var _number2 = _interopRequireDefault(_number);

var _object = require('./object');

var _object2 = _interopRequireDefault(_object);

var _shape = require('./shape');

var _shape2 = _interopRequireDefault(_shape);

var _string = require('./string');

var _string2 = _interopRequireDefault(_string);

function parse(value) {
  if (typeof value === 'function') {
    if (value === String) {
      value = _string2['default'];
    } else if (value === Boolean) {
      value = _boolean2['default'];
    } else if (value === Number) {
      value = _number2['default'];
    } else if (value === Object) {
      value = _object2['default'];
    } else if (value === Date) {
      value = _date2['default'];
    } else if (value === Function) {
      value = _func2['default'];
    } else {
      value = _any2['default'].extend({
        cast: value
      });
    }
  } else if (Array.isArray(value)) {
    value = (0, _arrayOf2['default'])(parse(value[0] || _any2['default']));
  } else if (!(0, _isSchema2['default'])(value)) {
    if (typeof value === 'object' && value !== null) {
      value = (0, _shape2['default'])(value);
    } else {
      throw new Error('Cannot parse schema value \'' + value + '\' (' + typeof value + ').');
    }
  }
  return value;
}

;
module.exports = exports['default'];
},{"./any":3,"./arrayOf":4,"./boolean":5,"./date":7,"./func":9,"./isSchema":11,"./number":14,"./object":15,"./shape":19,"./string":20}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (value) {
  return { error: null, value: value };
};

;
module.exports = exports["default"];
},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = shape;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _transformObject = require('./transformObject');

var _transformObject2 = _interopRequireDefault(_transformObject);

var _isSchema = require('./isSchema');

var _isSchema2 = _interopRequireDefault(_isSchema);

var _isPlainObject = require('./_isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _merge2 = require('./merge');

var _merge3 = _interopRequireDefault(_merge2);

var _transformObjectOutsideIn = require('./_transformObjectOutsideIn');

var _transformObjectOutsideIn2 = _interopRequireDefault(_transformObjectOutsideIn);

function shape(_x2) {
  var _again = true;

  _function: while (_again) {
    var spec = _x2;
    _again = false;

    if ((0, _isSchema2['default'])(spec)) {
      if (spec.attributes.type === 'shape') {
        _x2 = spec.attributes.keys;
        _again = true;
        continue _function;
      } else {
        throw new Error('Argument must be a plain object or a shape schema.');
      }
    }
    return (0, _transformObject2['default'])(spec, function (spec) {
      for (var key in spec) {
        spec[key] = (0, _parse2['default'])(spec[key]);
      }
      return _any2['default'].extend({
        attributes: {
          type: 'shape',
          keys: spec
        },

        cast: function cast(value, options) {
          var retval = {};
          if (!(0, _isPlainObject2['default'])(value)) {
            value = {};
          }
          for (var key in this.attributes.keys) {
            var val = this.attributes.keys[key].cast(value[key]);
            if (val !== undefined) {
              retval[key] = val;
            }
          }
          return retval;
        },

        validate: function validate(value) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

          if (value === null || typeof value !== 'object') {
            return (0, _fail2['default'])(this, 'must be an object');
          }
          var errors = [];
          var retval = {};
          for (var key in this.attributes.keys) {
            var label = this.attributes.keys[key].attributes.label || key;
            var result = this.attributes.keys[key].label(label).validate(value[key], options);
            if (result.error) {
              errors.push({
                key: key,
                message: result.error.message
              });
              if (options.abortEarly) {
                break;
              }
            } else {
              if (result.value !== undefined) {
                retval[key] = result.value;
              }
            }
          }
          if (errors.length > 0) {
            return (0, _fail2['default'])(this, errors);
          }
          return (0, _pass2['default'])(retval);
        },

        path: function path(selector) {
          var _selector$split = selector.split('.');

          var _selector$split2 = _toArray(_selector$split);

          var top = _selector$split2[0];

          var rest = _selector$split2.slice(1);

          for (var key in this.attributes.keys) {
            if (key === top) {
              return this.attributes.keys[key].path(rest.join('.'));
            }
          }
          throw new Error('Path "' + selector + '" is invalid.');
        },

        without: function without() {
          var spec = {};

          for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
            keys[_key] = arguments[_key];
          }

          for (var key in this.attributes.keys) {
            if (keys.indexOf(key) === -1) {
              spec[key] = this.attributes.keys[key];
            } else {
              // delete the key
              spec[key] = undefined;
            }
          }
          return this.extend({
            attributes: {
              keys: spec
            }
          });
        },

        pluck: function pluck() {
          var spec = {};

          for (var _len2 = arguments.length, keys = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            keys[_key2] = arguments[_key2];
          }

          for (var key in this.attributes.keys) {
            if (keys.indexOf(key) > -1) {
              spec[key] = this.attributes.keys[key];
            } else {
              // delete the key
              spec[key] = undefined;
            }
          }
          return this.extend({
            attributes: {
              keys: spec
            }
          });
        },

        merge: function merge(spec) {
          spec = (0, _transformObjectOutsideIn2['default'])(shape(spec), function (x) {
            return x.attributes.type === 'shape' ? x.attributes.keys : x;
          });
          var self = (0, _transformObjectOutsideIn2['default'])(this, function (x) {
            return x.attributes.type === 'shape' ? x.attributes.keys : x;
          });
          return shape((0, _merge3['default'])(self, spec));
        },

        transform: function transform(_transform) {
          var spec = {};
          for (var key in this.attributes.keys) {
            spec[key] = _transform(this.attributes.keys[key].transform(_transform));
          }
          return this.extend({
            attributes: {
              keys: spec
            }
          });
        },

        unknown: function unknown() {
          var parent = this.transform(function (schema) {
            if (schema.attributes.type === 'shape') {
              return schema.unknown();
            } else {
              return schema;
            }
          });
          return parent.extend({
            attributes: {
              unknown: true
            },
            cast: function cast(value, options) {
              var retval = parent.cast.call(this, value, options);
              for (var key in value) {
                if (!this.attributes.keys[key]) {
                  retval[key] = value[key];
                }
              }
              return retval;
            },

            validate: function validate(value, options) {
              var result = parent.validate.call(this, value, options);
              if (result.value) {
                for (var key in value) {
                  if (!this.attributes.keys[key]) {
                    result.value[key] = value[key];
                  }
                }
              }
              return result;
            }
          });
        }
      });
    });
  }
}

;
module.exports = exports['default'];
},{"./_isPlainObject":1,"./_transformObjectOutsideIn":2,"./any":3,"./fail":8,"./isSchema":11,"./merge":12,"./parse":17,"./pass":18,"./transformObject":21}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

// http://stackoverflow.com/a/46181
var _email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

exports['default'] = _any2['default'].extend({
  attributes: {
    type: 'string'
  },

  cast: function cast(value) {
    return String(value || '');
  },

  validate: function validate(value) {
    if (!value || typeof value !== 'string') {
      return (0, _fail2['default'])(this, 'must be a non-empty string');
    }
    return (0, _pass2['default'])(value);
  },

  email: function email() {
    var parent = this;
    return this.extend({
      validate: function validate(value, options) {
        if (!_email.test(value)) {
          return (0, _fail2['default'])(this, 'must be an email');
        } else {
          return parent.validate.call(this, value, options);
        }
      }
    });
  },

  lowerCase: function lowerCase() {
    var parent = this;
    return this.extend({
      cast: function cast(value) {
        return parent.cast.call(this, value).toLowerCase();
      },
      validate: function validate(value, options) {
        var result = parent.validate.call(this, value, options);
        if (result.value) {
          result.value = result.value.toLowerCase();
        }
        return result;
      }
    });
  },

  upperCase: function upperCase() {
    var parent = this;
    return this.extend({
      cast: function cast(value) {
        return parent.cast.call(this, value).toUpperCase();
      },
      validate: function validate(value, options) {
        var result = parent.validate.call(this, value, options);
        if (result.value) {
          result.value = result.value.toUpperCase();
        }
        return result;
      }
    });
  },

  trim: function trim() {
    var parent = this;
    return this.extend({
      cast: function cast(value, options) {
        return parent.cast.call(this, value, options).trim();
      },
      validate: function validate(value, options) {
        var result = parent.validate.call(this, value, options);
        if (result.value) {
          result.value = result.value.trim();
        }
        return result;
      }
    });
  },

  'default': function _default(defaultValue) {
    var parent = this;
    return this.extend({
      cast: function cast(value, options) {
        if (!value) {
          return parent.cast.call(this, defaultValue, options);
        } else {
          return parent.cast.call(this, value, options);
        }
      },

      validate: function validate(value, options) {
        if (!value) {
          return parent.validate.call(this, defaultValue, options);
        } else {
          return parent.validate.call(this, value, options);
        }
      }
    });
  },

  optional: function optional() {
    var parent = this;
    return this.extend({
      attributes: {
        optional: true
      },

      cast: function cast(value, options) {
        if (!value) {
          return;
        } else {
          return parent.cast.call(this, value, options);
        }
      },

      validate: function validate(value, options) {
        if (!value) {
          return (0, _pass2['default'])();
        } else {
          return parent.validate.call(this, value, options);
        }
      }
    });
  }
});
module.exports = exports['default'];
},{"./any":3,"./fail":8,"./pass":18}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = transformObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _isPlainObject = require('./_isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

/**
 * Transforms an object from the inside out. The root object is assumed to be a
 * plain object, and its nodes are transformed before the object is passed to
 * the replacer function have already been transformed.
 */

function transformObject(object, replace) {
  if (!(0, _isPlainObject2['default'])(object)) {
    throw new Error('Object must be a plain object.');
  }
  return _transformObject(object, replace);
}

;

function _transformObject(object, replace) {
  return replace(Object.keys(object).reduce(function (result, key) {
    if ((0, _isPlainObject2['default'])(object[key])) {
      return _extends({}, result, _defineProperty({}, key, _transformObject(object[key], replace)));
    } else {
      return _extends({}, result, _defineProperty({}, key, object[key]));
    }
  }, {}));
}
module.exports = exports['default'];
},{"./_isPlainObject":1}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = vm;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isSchema = require('./isSchema');

var _isSchema2 = _interopRequireDefault(_isSchema);

var _shape = require('./shape');

var _shape2 = _interopRequireDefault(_shape);

var _transformObject = require('./transformObject');

var _transformObject2 = _interopRequireDefault(_transformObject);

function vm(schema) {
  if ((0, _isSchema2['default'])(schema)) {
    if (schema.attributes.type !== 'shape') {
      throw new Error('Schema must be a shape.');
    }
  } else {
    schema = (0, _shape2['default'])(schema);
  }
  schema = schema.transform(function transform(node) {
    if (node.attributes.type === 'shape') {
      return vm(node);
    } else {
      return node;
    }
  });
  return schema.extend({
    attributes: {
      type: 'vm',
      keys: schema.attributes.keys
    },

    cast: function cast(source, options) {
      var _this = this;

      if (source === null || typeof source !== 'object') {
        source = {};
      }
      var model = {};

      var _loop = function (key) {
        var _value = _this.attributes.keys[key].cast(source[key]);
        Object.defineProperty(model, key, {
          enumerable: true,
          configurable: true,
          get: function get() {
            return _value;
          },
          set: function set(value) {
            _value = _this.attributes.keys[key].cast(value);
          }
        });
      };

      for (var key in this.attributes.keys) {
        _loop(key);
      }
      return model;
    }
  });
}

;
module.exports = exports['default'];
},{"./isSchema":11,"./shape":19,"./transformObject":21}]},{},[10])(10)
});
//# sourceMappingURL=celebi.js.map?84c723bfeff1fa961204bc2d0b6be1cedbf8e46d
