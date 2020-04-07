"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Any = Any;
exports.Nil = Nil;
exports.Iterator = Iterator;
exports.OneOf = OneOf;
exports.equal = exports.zip = exports.kvp = exports.vals = exports.evolve = exports.mapError = exports.dissocIn = exports.assocIn = exports.getIn = exports.into = exports.take = exports.remove = exports.removeKV = exports.filter = exports.filterKV = exports.every = exports.any = exports.sliceFrom = exports.slice = exports.join = exports.andThen = exports.foldrKV = exports.foldlKV = exports.getInOrElse = exports.getOrElse = exports.liftA6 = exports.liftA5 = exports.liftA4 = exports.liftA3 = exports.liftA2 = exports.pipe = exports.memoize = exports.fork = exports.Task = exports.result = exports.Result = exports.maybe = exports.Maybe = exports.Product = exports.Sum = exports.flatten = exports.of = exports.IMonadic = exports.ap = exports.IApply = exports.bimap = exports.IBifunctor = exports.cata = exports.ICata = exports.map = exports.IFunctor = exports.foldr = exports.foldl = exports.IFold = exports.append = exports.empty = exports.IMonoid = exports.get = exports.ILookup = exports.disj = exports.ISet = exports.dissoc = exports.assoc = exports.IAssociative = exports.keys = exports.IKeyed = exports.iterator = exports.IIterator = exports.conj = exports.ICollection = exports.rest = exports.first = exports.ISeq = exports.hash = exports.IHash = exports.count = exports.ICount = exports.shallowClone = exports.clone = exports.IClone = exports.show = exports.IShow = exports.caseOf = exports.Union = exports.Type = exports.defmethod = exports.defmulti = exports.implementsProtocol = exports.extendType = exports.extendProtocol = exports.Protocol = exports.comp = exports.is = exports.assert = exports.curry = exports.withMeta = exports.__ = exports.identity = exports.id = exports.showType = void 0;
exports.uppercase = exports.lowercase = exports.replace = exports.split = exports.deepEqual = exports.shallowEqual = void 0;

var _this = void 0;

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ProtocolSym = Symbol("protocol");
var TypeKey = Symbol("____TypeKey");
var TypeKeys = Symbol("____TypeKeys");
var KindKey = Symbol("____KindKey");
var CustomType = Symbol("____CustomType");
var TypeConstructor = Symbol("____TypeConstructor");
var UnionType = Symbol("____UnionType");
var UnionCases = Symbol("____UnionCases");
var UnionCase = Symbol("____UnionCase");
var UnionValues = Symbol("____UnionValues");
var AnyType = Symbol("____AnyType");

var showType = function showType(T) {
  if (T == null) return "Null";
  if (T === String || typeof T === "string") return "String";
  if (T === Number || typeof T === "number") return "Number";
  if (T === Boolean) return "Boolean";
  if (T === RegExp || T instanceof RegExp) return "RegExp";
  if (T === Array) return "Array";
  if (T[KindKey] === CustomType) return T[TypeKey];

  if (T[KindKey] === UnionType) {
    if (T[UnionCase]) return "".concat(T[TypeKey], ".").concat(T[UnionCase]);else return T[TypeKey];
  }

  if (T === Function || typeof T === "function") return "Function";
  if (T.constructor === Object) return "{ ".concat(Object.keys(T).map(function (key) {
    return "".concat(key, ": ").concat(showType(T[key]));
  }).join(", "), " }");
  if (typeof T === "string") return "\"".concat(T, "\"");
  return T.toString().replace(/function\s*/, "").replace(/\(\)/, "").replace(/\{\s\[native code\]\s\}/, "").replace(/\{\}/, "").replace(/\s*/g, "");
};

exports.showType = showType;

var getType = function getType(implementor) {
  if (implementor == null) return Nil;

  if (implementor[TypeConstructor]) {
    return implementor[TypeConstructor];
  }

  return implementor.constructor;
};

var groupArgs = function groupArgs(args) {
  var keys = args.filter(function (x, i) {
    return i % 2 === 0;
  });
  var vals = args.filter(function (x, i) {
    return i % 2 === 1;
  });
  return keys.map(function (x, i) {
    return [x, vals[i]];
  });
};

var id = function id(x) {
  return x;
};

exports.id = id;
var identity = id; // -- Core

exports.identity = identity;

var __ = new function Placeholder() {}();

exports.__ = __;

function Any() {}

function Nil() {}

function Iterator() {}

function OneOf() {
  for (var _len = arguments.length, types = new Array(_len), _key = 0; _key < _len; _key++) {
    types[_key] = arguments[_key];
  }

  if (!(this instanceof OneOf)) return _construct(OneOf, types);
  this._types = types;
}

var withMeta = function withMeta(x, meta) {
  x.meta = x.meta || {};
  Object.keys(meta).forEach(function (key) {
    x.meta[key] = meta[key];
  });
  return x;
};
/*
 * curry(fn, arity = fn.length)
 *
 * Transforms a function into a function that can be partially applied.
 * Given any fixed arity function it returns a new function that can be partially applied.
 *
 * Example:
 *
 *   const times    = curry((a, b) => a * b);
 *   const timesTwo = times(2);
 *   const mod2     = mod(__, 2); // __ can be used as a placeholder for partial application
 *
 *   times(2, 4) //=> 8
 *   times(2)(4) //=> 8
 *   timesTwo(4) //=> 8
 *
 *   mod2(2)     //=> 0
 *   mod2(3)     //=> 1
 */


exports.withMeta = withMeta;

var curry = function curry(f, n) {
  var arity = n == null ? f.length : n;
  var name = f.name;
  if (arity < 2) return f;

  var curriedFn = function curriedFn() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args = args.slice(0, arity);
    var realArity = args.filter(function (x) {
      return x !== __;
    }).length;
    var self = this;
    if (realArity >= arity) return f.apply(self, args);else {
      var g = function g() {
        var newArgs = [];

        for (var _len3 = arguments.length, partialArgs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          partialArgs[_key3] = arguments[_key3];
        }

        for (var i = 0; i < args.length; i++) {
          newArgs[i] = args[i] === __ ? partialArgs.length === 0 ? undefined : partialArgs.shift() : args[i];
        }

        return curriedFn.apply(self, newArgs.concat(partialArgs));
      };

      g.toString = curriedFn.toString.bind(curriedFn);
      return g;
    }
  };

  curriedFn.toString = f.toString.bind(f);
  return withMeta(curriedFn, {
    name: f.name
  });
};
/*
 * assert(test, msg)
 *
 * Throws a TypeError with the provided message if test evaluates to false
 */


exports.curry = curry;
var assert = curry(function (test, msg) {
  if (!test) throw new TypeError(msg);
}, 2);
/*
 * is(type, obj)
 *
 * Returns true if 'obj' is of type 'type', false otherwise.
 *
 * Example:
 *
 *   is(String, 'foo') //=> true
 *   is(String, [1,2]) //=> false
 */

exports.assert = assert;
var is = curry(function (type, obj) {
  if (obj == null && type === Nil) return true;
  if (obj === null && type === null) return true;
  if (obj === undefined && type === undefined) return true;
  if (obj == null || type == null) return false;
  if (type === Any) return true;
  if (type === obj) return true;
  if (type === Function && typeof obj === "function") return true;

  if (type instanceof OneOf) {
    return type._types.some(is(__, obj));
  }

  if (type[TypeKey] != null && type[TypeKey] === obj[TypeKey] && obj[KindKey] === CustomType) return true;
  if (obj[KindKey] === UnionType && (!type[UnionCase] || type[UnionCase] === obj[UnionCase]) && (obj[TypeKey] === type[TypeKey] || type[TypeKey] === undefined)) if (type._tag === "TypedUnion") {
    return type._types.every(function (t, i) {
      return is(t, obj[UnionValues][i]);
    });
  } else {
    return true;
  }

  if (Array.isArray(type) && Array.isArray(obj) && type.length === 1) {
    return obj.every(is(type[0], __));
  }

  if (type.constructor === Object && obj.constructor === Object) {
    return Object.keys(type).every(function (key) {
      return is(type[key], obj[key]);
    });
  }

  var constructor = obj.constructor;
  return !obj[KindKey] && constructor && constructor === type;
}, 2);
/*
 * comp(...chain)
 *
 * Function composition. The result of comp(f, g)(x) is the same as f(g(x)).
 *
 * Example:
 *   map(comp(isOdd, inc), [1, 2, 3]) // => [false, true, false]
 */

exports.is = is;

var comp = function comp() {
  for (var _len4 = arguments.length, chain = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    chain[_key4] = arguments[_key4];
  }

  return function (x) {
    return _foldr(function (f, acc) {
      return f(acc);
    }, x, chain);
  };
}; // -- Protocol

/*
 * Protocol(name, spec)
 *
 * A protocol is a named set of named methods and their signatures that can be extended to multiple types.
 *
 * Example:
 *
 *   const ILookup = Protocol({
 *     get: ['key', 'coll']
 *   })
 *   const { get } = ILookup
 *
 *   extendProtocol(ILookup,
 *     Array, {
 *       get: (key, coll) => maybe(coll[key])
 *     },
 *
 *     Immutable.List, {
 *       get: (key, coll) => maybe(coll.get(key))
 *     }
 *   )
 *
 *   const l1 = [1,2,3]
 *   const l2 = Immutable.List.of(1,2,3)
 *
 *   get(0, [1,2,3])                  //=> Maybe.Some(1)
 *   get(0, Immutable.List.of(1,2,3)) //=> Maybe.Some(1)
 */


exports.comp = comp;
var Protocol = curry(function (name, spec) {
  var dispatch = function dispatch(funcName, argList) {
    return curry(function () {
      var _ref;

      var self = (_ref = arguments.length - 1, _ref < 0 || arguments.length <= _ref ? undefined : arguments[_ref]);
      var method = (getType(self)[ProtocolSym] || {})[funcName];

      if (!method && self && typeof self[Symbol.iterator] === "function") {
        method = (Iterator[ProtocolSym] || {})[funcName];
      }

      assert(method, "No implementation of required function '".concat(funcName, "(").concat(argList.join(", "), ")' of protocol '").concat(name, "' found for type '").concat(showType(getType(self)), "'"));
      return method.apply(void 0, arguments);
    }, argList.length);
  };

  Object.keys(spec).forEach(function (key) {
    var args = spec[key];
    spec[key] = withMeta(dispatch(key, args), {
      name: key,
      args: args
    });
  });
  return spec;
}, 2);
/*
 * extendProtocol(Protocol, ...[type, spec])
 *
 * Extends a protocol to one or more types.
 *
 * Example:
 *
 *   extendProtocol(IMonoid,
 *     String, {
 *       concat : (a, b) => a + b,
 *       empty  : ()     => ''
 *     },
 *     Sum, {
 *       concat : (a, b) => a + b,
 *       empty  : ()     => 0
 *     },
 *     Product, {
 *       concat : (a, b) => a * b,
 *       empty  : ()     => 1
 *     },
 *     Array, {
 *       concat : (a, b) => a.concat(b),
 *       empty  : ()     => []
 *     },
 *   )
 */

exports.Protocol = Protocol;

var extendProtocol = function extendProtocol(protocol) {
  for (var _len5 = arguments.length, rest = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    rest[_key5 - 1] = arguments[_key5];
  }

  groupArgs(rest).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        type = _ref3[0],
        impl = _ref3[1];

    type[ProtocolSym] = type[ProtocolSym] || {};

    for (var key in impl) {
      if (impl.hasOwnProperty(key)) type[ProtocolSym][key] = impl[key];
    }
  });
};
/*
 * extendType(type, ...[protocol, spec])
 *
 * Extends a type to one or more protocols.
 *
 * Example:
 *
 *   extendType(
 *     Array,
 *
 *     ISeq, {
 *       first: coll => maybe(coll[0]),
 *       rest: coll => coll.slice(1),
 *     },
 *
 *     IReduce, {
 *       foldl: (coll, f, initial) => coll.reduce(f, initial)
 *     }
 *   )
 */


exports.extendProtocol = extendProtocol;

var extendType = function extendType(type) {
  for (var _len6 = arguments.length, extensions = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    extensions[_key6 - 1] = arguments[_key6];
  }

  groupArgs(extensions).map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        protocol = _ref5[0],
        impl = _ref5[1];

    type[ProtocolSym] = type[ProtocolSym] || {};

    for (var key in impl) {
      if (impl.hasOwnProperty(key)) type[ProtocolSym][key] = curry(impl[key], impl[key].length);
    }
  });
};

exports.extendType = extendType;
var implementsProtocol = curry(function (protocol, obj) {
  var type = getType(obj);
  if (!type) return false;
  var protocols = type[ProtocolSym];
  return Object.keys(protocol).every(function (key) {
    var fn = protocols[key];
    return fn && typeof fn === "function";
  });
}); // -- MultiMethod

/*
 * defmulti(dispatch)
 *
 * Creates a that provides runtime polymorphic
 * dispatch to different function based on any argument.
 *
 * Example:
 *
 *   const point = defmulti((x, y) => [x, y])
 *   multi::defmethod([1, 2], (x, y) => 'x: 1, y: 2, z: 3')
 *   multi::defmethod([4, 5], (x, y) => 'x: 4, y: 5, z: 6')
 *
 */

exports.implementsProtocol = implementsProtocol;

var defmulti = function defmulti(dispatch) {
  var methods = [];
  var multimethod = curry(function () {
    var method = multimethod.dispatchFn.apply(multimethod, arguments);

    if (Array.isArray(method)) {
      var _method = _slicedToArray(method, 3),
          fn = _method[0],
          unionVals = _method[1],
          union = _method[2];

      return fn.apply(void 0, _toConsumableArray(unionVals));
    } else {
      return method.apply(void 0, arguments);
    }
  }, dispatch.length);
  multimethod.type = "MultiMethod";
  multimethod.displayName = "<multimethod>";

  multimethod.dispatchFn =
  /*memoize*/
  function () {
    var match;
    var i = 0;
    var len = methods.length;
    var fallback = null;

    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    for (; i < len; i++) {
      var method = methods[i];
      var matcher = method.matcher;

      if (matcher === __) {
        fallback = method;
      } else {
        var ret = dispatch.apply(void 0, args);

        if (is(Union, ret) && is(ret, matcher) && ret[UnionCase] === matcher[UnionCase]) {
          match = [method, ret[UnionValues]];
        }

        if (!is(Union, ret)) {
          if (ret === matcher || deepEqual(matcher, ret)) {
            match = method;
            break;
          }
        }
      }
    }

    if (!match) {
      if (fallback) {
        match = fallback;
      } else {
        throw new Error("Couldn't find a matching handler for argument(s): ".concat(_show(args)));
      }
    }

    return match;
  };

  multimethod.methods = methods;

  multimethod.inspect = function () {
    return "<MultiMethod>";
  };

  return multimethod;
};
/*
 * defmethod(multimethod, matcher, method)
 *
 * Creates and installs a new method of multimethod associated with dispatch-value.
 *
 */


exports.defmulti = defmulti;
var defmethod = curry(function (matcher, fn, multimethod) {
  fn.matcher = matcher;
  multimethod.methods.push(fn);
  return multimethod;
}, 3); // -- Type

/*
 * Type(name, spec)
 *
 * Type(name : String, spec: Object) => Function
 *
 * Creates custom type constructors.
 *
 * Examples:
 *
 *   const Book = Type({ title: String })
 *   const Philosopher = Type({ name: String, books: [Maybe(Book)] })
 *
 *   const judith = Philosopher("Judith Butler",
 *     [ Book("Bodies That Matter")
 *     , Book("Precarious Life")
 *     ]
 *   ) // =>  { name: "Judith Butler", age: 62, books: [{ title: "Bodies That Matter" }, { title: "Precarious Life" }] }
 *
 *   judith::is(Type) //=> true
 *   judith::is(Philosopher) //=> true
 *   judith::is(Book) //=> false
 *
 *  Philosopher("Michel Foucault", "Discipline and Punish") //=>
 *
 *    TypeError:
 *    Invalid types passed into the Philosopher({ name: String, books: [ Book ] }) constructor:
 *      Field: books - expected value of type [ Book ] but got: "Discipline and Punish"
 */

exports.defmethod = defmethod;

var Type = function Type(name, spec) {
  var specKeys = Object.keys(spec);
  var constructor = curry(function () {
    var _objectSpread2;

    for (var _len8 = arguments.length, values = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      values[_key8] = arguments[_key8];
    }

    var data = specKeys.reduce(function (acc, key, i) {
      return acc[key] = values[i], acc;
    }, {});
    var errors = specKeys.reduce(function (acc, key, i) {
      var val = values[i];
      var T = spec[key];
      return is(T, val) ? acc : acc.concat({
        key: key,
        type: T,
        val: val
      });
    }, []);

    if (errors.length) {
      throw new TypeError("Invalid types passed into the ".concat(name, "(").concat(showType(spec), ") constructor:\n  ").concat(errors.map(function (_ref6) {
        var key = _ref6.key,
            type = _ref6.type,
            val = _ref6.val;
        return "  * Field: ".concat(key, " - expected value of type ").concat(showType(type), " but got: ").concat(_show(val));
      }).join("\n"), "\n  "));
    }

    var type = _objectSpread((_objectSpread2 = {}, _defineProperty(_objectSpread2, TypeKey, name), _defineProperty(_objectSpread2, TypeKeys, specKeys), _defineProperty(_objectSpread2, KindKey, CustomType), _defineProperty(_objectSpread2, TypeConstructor, constructor), _objectSpread2), data);

    type.toString = function () {
      return "".concat(name, "(").concat(specKeys.map(function (key) {
        return _show(type[key]);
      }).join(", "), ")");
    };

    return type;
  }, specKeys.length);
  constructor[KindKey] = CustomType;
  constructor[TypeKey] = name;
  extendType(constructor, IShow, {
    show: function show(type) {
      return type.toString();
    }
  }, IClone, {
    clone: function clone(type) {
      return type;
    },
    shallowClone: function shallowClone(type) {
      return type;
    }
  }, ICount, {
    count: function count(type) {
      return type[TypeKeys].length;
    }
  }, ILookup, {
    get: function get(key, type) {
      return maybe(type[key]);
    }
  }, ISeq, {
    first: function first(type) {
      return get(0, type);
    },
    rest: function rest(type) {
      return _rest(type[TypeKeys]);
    }
  }, IKeyed, {
    keys: function keys(type) {
      return type[TypeKeys];
    }
  });
  return constructor;
}; // -- Union


exports.Type = Type;

var Union = function Union(name, spec) {
  var specKeys = Object.keys(spec);

  function _Union() {
    for (var _len9 = arguments.length, types = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      types[_key9] = arguments[_key9];
    }

    if (!(this instanceof _Union)) {
      return _construct(_Union, types);
    }

    this._tag = "TypedUnion";
    this._types = types;
  }

  _Union[TypeKey] = name;
  _Union[UnionCases] = specKeys;
  _Union[KindKey] = UnionType;
  extendType(_Union, IShow, {
    show: function show(self) {
      return "".concat(name, ".").concat(self[UnionCase], "(").concat(join(", ", _map(_show, self[UnionValues])), ")");
    }
  });
  return specKeys.reduce(function (acc, key, i) {
    var _case = curry(function () {
      var _ref7;

      for (var _len10 = arguments.length, vals = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        vals[_key10] = arguments[_key10];
      }

      var hasErrors = spec[key].some(function (type, i) {
        return !is(type, vals[i]);
      });

      if (hasErrors) {
        throw new TypeError("Type mismatch: Type ".concat(name, ".").concat(key, "(").concat(spec[key].map(showType).join(", "), ") was invoked with incompatible types: ").concat(name, ".").concat(key, "(").concat(vals.map(_show).join(", "), ")\n  "));
      }

      return _ref7 = {}, _defineProperty(_ref7, TypeKey, name), _defineProperty(_ref7, UnionCase, key), _defineProperty(_ref7, KindKey, UnionType), _defineProperty(_ref7, UnionCases, specKeys), _defineProperty(_ref7, UnionValues, vals), _defineProperty(_ref7, TypeConstructor, _Union), _ref7;
    }, spec[key].length);

    _case[TypeKey] = name;
    _case[KindKey] = UnionType;
    _case[UnionCase] = key;
    acc[key] = _case;
    return acc;
  }, _Union);
};

exports.Union = Union;
var caseOf = curry(function (spec, type) {
  if (!type || type[KindKey] !== UnionType) {
    throw new TypeError("'caseOf' expects a union type but was called with ".concat(_show(type)));
  }

  var wildCard = spec._;
  var specKeys = Object.keys(spec);

  if (!wildCard && !type[UnionCases].every(function (key) {
    return specKeys.some(function (_case) {
      return key === _case;
    });
  })) {
    throw new TypeError("Non-exhaustive pattern matching detected, expected: ".concat(_show(type[UnionCases]), " but got: ").concat(_show(specKeys), ".\n  Please provide all cases or use a wildcard."));
  }

  var match = spec[type[UnionCase]] || wildCard;
  return match.apply(void 0, _toConsumableArray(type[UnionValues]));
}); // -- Core Protocols

exports.caseOf = caseOf;
var IShow = Protocol("IShow", {
  show: ["x"]
});
exports.IShow = IShow;
var _show = IShow.show;
exports.show = _show;
var IClone = Protocol("IClone", {
  clone: ["x"],
  shallowClone: ["x"]
});
exports.IClone = IClone;
var _clone = IClone.clone,
    shallowClone = IClone.shallowClone;
exports.shallowClone = shallowClone;
exports.clone = _clone;
var ICount = Protocol("ICount", {
  count: ["xs"]
});
exports.ICount = ICount;
var count = ICount.count;
exports.count = count;
var IHash = Protocol("IHash", {
  hash: ["x"]
});
exports.IHash = IHash;
var hash = IHash.hash;
exports.hash = hash;
var ISeq = Protocol("ISeq", {
  first: ["xs"],
  rest: ["xs"]
});
exports.ISeq = ISeq;
var first = ISeq.first,
    _rest = ISeq.rest;
exports.rest = _rest;
exports.first = first;
var ICollection = Protocol("ICollection", {
  conj: ["x", "xs"]
});
exports.ICollection = ICollection;
var conj = ICollection.conj;
exports.conj = conj;
var IIterator = Protocol("IIterator", {
  iterator: ["x"]
});
exports.IIterator = IIterator;
var iterator = IIterator.iterator;
exports.iterator = iterator;
var IKeyed = Protocol("IKeyed", {
  keys: ["xs"]
});
exports.IKeyed = IKeyed;
var keys = IKeyed.keys;
exports.keys = keys;
var IAssociative = Protocol("IAssociative", {
  assoc: ["key", "val", "xs"],
  dissoc: ["key", "xs"]
});
exports.IAssociative = IAssociative;
var _assoc = IAssociative.assoc,
    _dissoc = IAssociative.dissoc;
exports.dissoc = _dissoc;
exports.assoc = _assoc;
var ISet = Protocol("ISet", {
  disj: ["x", "xs"]
});
exports.ISet = ISet;
var disj = ISet.disj;
exports.disj = disj;
var ILookup = Protocol("ILookup", {
  get: ["key", "xs"]
});
exports.ILookup = ILookup;
var get = ILookup.get;
exports.get = get;
var IMonoid = Protocol("IMonoid", {
  empty: ["xs"],
  append: ["x", "xs"]
});
exports.IMonoid = IMonoid;
var _empty = IMonoid.empty,
    _append = IMonoid.append;
exports.append = _append;
exports.empty = _empty;
var IFold = Protocol("IFold", {
  foldl: ["f", "initial", "xs"],
  foldr: ["f", "initial", "xs"]
});
exports.IFold = IFold;
var _foldl = IFold.foldl,
    _foldr = IFold.foldr;
exports.foldr = _foldr;
exports.foldl = _foldl;
var IFunctor = Protocol("IFunctor", {
  map: ["f", "coll"]
});
exports.IFunctor = IFunctor;
var _map = IFunctor.map;
exports.map = _map;
var ICata = Protocol("ICata", {
  cata: ["f", "g", "coll"]
});
exports.ICata = ICata;
var cata = ICata.cata;
exports.cata = cata;
var IBifunctor = Protocol("IBifunctor", {
  bimap: ["f", "g", "coll"]
});
exports.IBifunctor = IBifunctor;
var bimap = IBifunctor.bimap;
exports.bimap = bimap;
var IApply = Protocol("IApply", {
  ap: ["ma", "mb"]
});
exports.IApply = IApply;
var ap = IApply.ap;
exports.ap = ap;
var IMonadic = Protocol("IMonadic", {
  of: ["x", "m"],
  flatten: ["m"]
});
exports.IMonadic = IMonadic;
var of = IMonadic.of,
    flatten = IMonadic.flatten; // -- Core Types

exports.flatten = flatten;
exports.of = of;
var Sum = Type("Sum", {
  val: Number
});
exports.Sum = Sum;
var Product = Type("Product", {
  val: Number
}); // -- Sum Types

exports.Product = Product;
var Maybe = Union("Maybe", {
  Some: [Any],
  None: []
});
exports.Maybe = Maybe;
Maybe.get = curry(function (fallback, m) {
  return cata(id, function () {
    return fallback;
  }, m);
}, 2);

var maybe = function maybe(x) {
  return is(Maybe, x) ? x : x == null ? Maybe.None() : Maybe.Some(x);
};

exports.maybe = maybe;
var Result = Union("Result", {
  Ok: [Any],
  Err: [Any]
});
exports.Result = Result;

var result = function result(ok, err) {
  return ok == null ? Result.Err(err) : Result.Ok(ok);
};
/* Task(fork: Function)
 *
 * Like a promise but pure, meaning it will not execute until fork is called.
 *
 * Example:
 *
 *   // Create the task
 *   const delayedTask = Task((fail, succeed) => setTimeout(succeed("hello!"), 1000))
 *
 *   // Transform the eventual result
 *   const transformedTask = delayedTask
 *     ::map(x => x + "!")
 *     ::andThen(x => Task.of(x + " task!!"))
 *
 *   // Actually execute the task
 *   transformedTask::fork(
 *     err => console.log("err:", err)
 *     val => console.log("val:", val)
 *   ) // => *** waits 1 second ***
 *     // => "hello!! Task!!"
 */


exports.result = result;
var Task = Type("Task", {
  fork: Function
});
exports.Task = Task;
var fork = curry(function (fail, succeed, task) {
  return task.fork(function (err) {
    if (is(Array, fail)) {
      var _fail = _toArray(fail),
          f = _fail[0],
          args = _fail.slice(1);

      return f.apply(void 0, _toConsumableArray(args));
    } else {
      return fail(err);
    }
  }, function (val) {
    if (is(Array, fail)) {
      var _fail2 = _toArray(fail),
          f = _fail2[0],
          args = _fail2.slice(1);

      return f.apply(void 0, _toConsumableArray(args));
    } else {
      return succeed(err);
    }
  });
}, 3);
exports.fork = fork;

Task.fail = function (x) {
  return Task(function (fail, succeed) {
    return fail(x);
  });
};

Task.succeed = function (x) {
  return Task(function (fail, succeed) {
    return succeed(x);
  });
};

Task.of = function (x) {
  return Task(function (fail, succeed) {
    return succeed(x);
  });
};
/* Task.none
 *
 * A task that does nothing
 */


Task.none = Task(function (_f, _s) {});
/* Task.perform(task: Task, error: Function, success: Function) => Task
 *
 * Transforms a regular task into one that never fails.
 *
 */

Task.perform = curry(function (task, error, success) {
  return Task(function (_, succeed) {
    return task.fork(function (err) {
      return succeed(err != null ? error(err) : error());
    }, function (val) {
      return succeed(val != null ? success(val) : success());
    });
  });
}, 3);
/* Task.try(task: Task, success: Function) => Task
 *
 * Like Task.perform but ignores the failure case
 *
 */

Task["try"] = curry(function (task, success) {
  return Task(function (_, succeed) {
    return task.fork(function (err) {}, function (val) {
      return succeed(val != null ? success(val) : success());
    });
  });
}, 2);

Task.fromPromise = function (p) {
  return Task(function (fail, succeed) {
    return p.then(succeed)["catch"](fail);
  });
};

Task.toPromise = function (t) {
  return new Promise(function (succeed, fail) {
    return t.fork(fail, succeed);
  });
};

Task.parallel = function (tasks) {
  return Task(function (fail, succeed) {
    return Promise.all(IFunctor.map(tasks, Task.toPromise)).then(succeed)["catch"](fail);
  });
}; // -- Core extenstions


extendType(Number, IShow, {
  show: function show(str) {
    return str.toString();
  }
}, IClone, {
  clone: id,
  shallowClone: id
});
extendType(Boolean, IShow, {
  show: function show(bool) {
    return bool.toString();
  }
}, IClone, {
  clone: id,
  shallowClone: id
});
extendType(RegExp, IShow, {
  show: function show(regex) {
    return regex.toString();
  }
}, IClone, {
  clone: function clone(regex) {
    return new RegExp(regex.source, regex.global ? "g" : "" + regex.ignoreCase ? "i" : "" + regex.multiline ? "m" : "");
  },
  shallowClone: _clone
}, IMonoid, {
  empty: function empty(self) {
    return new RegExp();
  },
  append: function append(r2, r1) {
    return new RegExp(r1.source + r2.source, "", r2.global ? "g" : "" + r2.ignoreCase ? "i" : "" + r2.multiline ? "m" : "");
  }
});
extendType(Date, IShow, {
  show: function show(date) {
    return date.toString();
  }
}, IClone, {
  clone: function clone(date) {
    return new Date(date);
  },
  shallowClone: _clone
});
extendType(Nil, IShow, {
  show: function show(_) {
    return "Nil";
  }
}, IClone, {
  clone: id,
  shallowClone: _clone
});
extendType(Array, IShow, {
  show: function show(xs) {
    return "[ ".concat(_map(_show, xs).join(", "), " ]");
  }
}, IClone, {
  clone: function clone(xs) {
    return _map(_clone, shallowClone(xs));
  },
  shallowClone: function shallowClone(xs) {
    return xs.slice();
  }
}, ICount, {
  count: function count(xs) {
    return xs.length;
  }
}, ILookup, {
  get: function get(key, xs) {
    return maybe(xs[key]);
  }
}, ISeq, {
  first: function first(xs) {
    return get(0, xs);
  },
  rest: function rest(xs) {
    return xs.slice(1);
  }
}, ICollection, {
  conj: function conj(x, xs) {
    return xs.concat(x);
  }
}, IIterator, {
  iterator: function iterator(xs) {
    return xs[Symbol.iterator]();
  }
}, IFold, {
  foldl: function foldl(f, initial, xs) {
    return xs.reduce(function (acc, v) {
      return f(v, acc);
    }, initial);
  },
  foldr: function foldr(f, initial, xs) {
    return xs.reduceRight(function (acc, v) {
      return f(v, acc);
    }, initial);
  }
}, IKeyed, {
  keys: function keys(xs) {
    return xs.map(function (_, i) {
      return i;
    });
  }
}, IAssociative, {
  assoc: function assoc(key, val, xs) {
    return foldlKV(function (k, v, acc) {
      return _append([key === k ? val : v], acc);
    }, [], xs);
  },
  dissoc: function dissoc(key, xs) {
    return removeKV(function (k, v) {
      return k === key;
    }, xs);
  }
}, IMonoid, {
  empty: function empty(_) {
    return [];
  },
  append: function append(x, xs) {
    return xs.concat(x);
  }
}, IFunctor, {
  map: function map(f, xs) {
    return xs.map(function (x) {
      return f(x);
    });
  }
}, IMonadic, {
  of: function of(x, xs) {
    return [x];
  },
  flatten: function flatten(xs) {
    return _foldl(_append, _empty(xs), xs);
  }
}, IApply, {
  ap: function ap(ma, mb) {
    return andThen(function (f) {
      return _map(f, ma);
    }, mb);
  }
});
extendType(String, IShow, {
  show: function show(str) {
    return "\"".concat(str, "\"");
  }
}, IClone, {
  clone: function clone(str) {
    return str;
  },
  shallowClone: _clone
}, ICount, {
  count: function count(str) {
    return str.length;
  }
}, ILookup, {
  get: function get(index, str) {
    return maybe(str[index]);
  }
}, ISeq, {
  first: function first(str) {
    return get(0, str);
  },
  rest: function rest(str) {
    return str.slice(1);
  }
}, ICollection, {
  conj: function conj(x, str) {
    return str + x;
  }
}, IIterator, {
  iterator: function iterator(str) {
    return str[Symbol.iterator]();
  }
}, IKeyed, {
  keys: function keys(str) {
    var i = 0;
    var keys = [];

    var _iterator = _createForOfIteratorHelper(str),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _ = _step.value;
        keys.push(i++);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return keys;
  }
}, IAssociative, {
  assoc: function assoc(k, v, str) {
    return join("", _assoc(k, v, split("", str)));
  },
  dissoc: function dissoc(k, self) {
    return join("", _dissoc(k, split("", self)));
  }
}, IMonoid, {
  empty: function empty(_) {
    return "";
  },
  append: function append(x, str) {
    return str + x;
  }
}, IFold, {
  foldl: function foldl(f, initial, str) {
    return _foldl(f, initial, split("", str));
  },
  foldr: function foldr(f, initial, str) {
    return _foldr(f, initial, split("", str));
  }
}, IFunctor, {
  map: function map(f, str) {
    return join("", _map(f, split("", str)));
  }
}, IMonadic, {
  of: function of(x, str) {
    return "".concat(x);
  },
  flatten: function flatten(str) {
    return str;
  }
}, IApply, {
  ap: function ap(ma, mb) {
    return andThen(function (f) {
      return _map(f, ma);
    }, mb);
  }
});
extendType(Object, IShow, {
  show: function show(obj) {
    return "{ ".concat(join(", ", foldlKV(function (k, v, acc) {
      return conj("".concat(k, ": ").concat(_show(v)), acc);
    }, [], obj)), " }");
  }
}, IClone, {
  clone: _map(_clone),
  shallowClone: function shallowClone(obj) {
    return foldlKV(function (k, v, obj) {
      return obj[k] = v, obj;
    }, {}, obj);
  }
}, IFold, {
  foldl: function foldl(f, init, obj) {
    return Object.keys(obj).reduce(function (acc, key) {
      return f(obj[key], acc);
    }, init);
  },
  foldr: function foldr(f, init, obj) {
    return Object.keys(obj).reduceRight(function (acc, key) {
      return f(obj[key], acc);
    }, init);
  }
}, ICount, {
  count: comp(count, Object.keys)
}, IKeyed, {
  keys: Object.keys
}, IAssociative, {
  assoc: function assoc(k, v, obj) {
    var copy = shallowClone(obj);
    copy[k] = v;
    return copy;
  },
  dissoc: function dissoc(k, obj) {
    var copy = shallowClone(obj);
    delete copy[k];
    return copy;
  }
}, ISeq, {
  first: function first(obj) {
    return _map(function (k) {
      return obj[k];
    }, get(0, Object.keys(obj)));
  },
  rest: function rest(obj) {
    var key = get(0, Object.keys(obj));
    return caseOf({
      Some: _dissoc(__, obj),
      None: function None() {
        return {};
      }
    }, key);
  }
}, ICollection, {
  conj: function conj(x, obj) {
    return Array.isArray(x) ? _assoc(x[0], x[1], obj) : foldlKV(_assoc, obj, x);
  }
}, ILookup, {
  get: function get(key, obj) {
    return maybe(obj[key]);
  }
}, IMonoid, {
  empty: function empty(_) {
    return {};
  },
  append: conj
}, IFunctor, {
  map: function map(f, obj) {
    return foldlKV(function (k, v, acc) {
      return _assoc(k, f(v), acc);
    }, {}, obj);
  }
});
extendType(Maybe, IClone, {
  clone: _map(_clone),
  shallowClone: _map(shallowClone)
}, IMonoid, {
  empty: function empty(_) {
    return Maybe.None();
  },
  append: function append(ma, mb) {
    return caseOf({
      Some: function Some(x1) {
        return caseOf({
          Some: function Some(x2) {
            return Maybe.Some(_append(x2, x1));
          },
          None: function None() {
            return mb;
          }
        }, ma);
      },
      None: function None() {
        return ma;
      }
    }, mb);
  }
}, IFold, {
  foldl: function foldl(f, initial, m) {
    return caseOf({
      Some: function Some(x) {
        return f(initial, x);
      },
      None: function None() {
        return initial;
      }
    }, m);
  },
  foldr: function foldr(f, initial, m) {
    return caseOf({
      Some: function Some(x) {
        return f(x, initial);
      },
      None: function None() {
        return initial;
      }
    }, m);
  }
}, IFunctor, {
  map: function map(f, m) {
    return caseOf({
      Some: comp(maybe, f),
      None: function None() {
        return m;
      }
    }, m);
  }
}, ICata, {
  cata: function cata(f, g, m) {
    return caseOf({
      Some: f,
      None: g
    }, m);
  }
}, IMonadic, {
  of: function of(x, xs) {
    return Maybe.Some(x);
  },
  flatten: function flatten(ma) {
    return caseOf({
      Some: function Some(x) {
        return is(Maybe, x) ? x : maybe(x);
      },
      None: Maybe.None
    }, ma);
  }
}, IApply, {
  ap: function ap(mb, ma) {
    return caseOf({
      Some: _map(__, mb),
      None: Maybe.None
    }, ma);
  }
});
extendType(Result, IClone, {
  clone: _map(_clone),
  shallowClone: _map(shallowClone)
}, IMonoid, {
  empty: function empty(x) {
    return caseOf({
      Ok: comp(Result.Ok, _empty),
      Err: comp(Result.Err, _empty)
    }, x);
  },
  append: function append(ma, mb) {
    return caseOf({
      Ok: function Ok(x1) {
        return caseOf({
          Ok: function Ok(x2) {
            return Result.Ok(_append(x2, x1));
          },
          Err: Result.Err
        }, ma);
      },
      Err: function Err(x1) {
        return caseOf({
          Ok: function Ok() {
            return mb;
          },
          Err: function Err(x2) {
            return Result.Err(_append(x2, x1));
          }
        }, ma);
      }
    }, mb);
  }
}, IFold, {
  foldl: function foldl(f, initial, m) {
    return caseOf({
      Ok: function Ok(x) {
        return f(initial, x);
      },
      Err: function Err() {
        return initial;
      }
    }, m);
  },
  foldr: function foldr(f, initial, m) {
    return caseOf({
      Ok: function Ok(x) {
        return f(x, initial);
      },
      Err: function Err() {
        return initial;
      }
    }, m);
  }
}, IFunctor, {
  map: function map(f, fa) {
    return caseOf({
      Ok: comp(Result.Ok, f),
      Err: function Err() {
        return fa;
      }
    }, fa);
  }
}, ICata, {
  cata: function cata(f, g, fa) {
    return caseOf({
      Ok: f,
      Err: g
    }, fa);
  }
}, IBifunctor, {
  bimap: function bimap(f, g, fa) {
    return caseOf({
      Ok: function Ok(x) {
        return Result.Ok(g(x));
      },
      Err: function Err(err) {
        return Result.Err(f(err));
      }
    }, fa);
  }
}, IMonadic, {
  of: function of(x, m) {
    return Result.Ok(x);
  },
  flatten: function flatten(ma) {
    return caseOf({
      Ok: function Ok(x) {
        return is(Result, x) ? x : Result.Ok(x);
      },
      Err: Result.Err
    }, ma);
  }
}, IApply, {
  ap: function ap(mb, ma) {
    return caseOf({
      Ok: _map(__, mb),
      Err: Result.Err
    }, ma);
  }
});
extendType(Task, IShow, {
  show: function show(t) {
    return "Task {}";
  }
}, IClone, {
  clone: _map(_clone),
  shallowClone: _map(shallowClone)
}, IFold, {
  foldl: function foldl(f, initial, t) {
    return Task(function (fail, succeed) {
      t.fork(function (_) {
        return succeed(initial);
      }, function (x) {
        return succeed(f(initial, x));
      });
    });
  },
  foldr: function foldr(f, initial, t) {
    return Task(function (fail, succeed) {
      t.fork(function (_) {
        return succeed(initial);
      }, function (x) {
        return succeed(f(x, initial));
      });
    });
  }
}, IFunctor, {
  map: function map(f, t) {
    return Task(function (fail, succeed) {
      return t.fork(fail, function (val) {
        return succeed(f(val));
      });
    });
  }
}, IBifunctor, {
  bimap: function bimap(f, g, m) {
    return Task(function (fail, succeed) {
      m.fork(function (err) {
        return fail(f(err));
      }, function (val) {
        return succeed(g(val));
      });
    });
  }
}, IMonadic, {
  of: function of(x, t) {
    return Task.of(x);
  },
  flatten: function flatten(t) {
    return Task(function (fail, succeed) {
      fail, succeed;
    });
  }
}, IApply, {
  ap: function ap(tb, ta) {
    return andThen(_map(__, tb), ta);
  }
}); // -- Function Utils

/*
 * memoize(fn)
 *
 * Returns a memoized version of a referentially transparent function.
 * The memoized version of the function keeps a cache of the mapping from
 * arguments to results and, when calls with the same arguments are repeated
 * often, has higher performance at the expense of higher memory use.
 *
 * created by @philogb and @addyosmani
 * further optimizations by @mathias, @DmitryBaranovsk & @GotNoSugarBaby
 * fixes by @AutoSponge
 * modified by @_pmh_
 * released under an MIT license
 * original implementation: https://github.com/addyosmani/memoize.js
 *
 * Example:
 *
 *   let square = memoize(x => {
 *     console.log('squaring:', x)
 *     return x * 2
 *   })
 *
 *   square(2) // logs 'squaring 2' and returns 4
 *   square(2) // returns 4 without logging
 */

var memoize = function memoize(fn) {
  var stringify = JSON.stringify,
      cache = {},
      source = fn.toString();

  var cachedfun = function cachedfun() {
    for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
      args[_key11] = arguments[_key11];
    }

    var hash = stringify(args.map(function (arg) {
      return arg[KindKey] === UnionType ? stringify(arg[UnionValues]) : arg;
    }));
    return hash in cache ? cache[hash] : cache[hash] = fn.apply(null, arguments);
  };

  cachedfun.__cache = function () {
    cache.remove || (cache.remove = function () {
      var hash = stringifyJson(arguments);
      return delete cache[hash];
    });
    return cache;
  }.call(_this);

  cachedfun.toString = function () {
    return source;
  };

  return cachedfun;
};
/*
 * pipe(x, ...chain)
 *
 * Allows threading a value through a series of functions.
 *
 * Example:
 *
 *   pipe(list(1,2,3), conj(4), map(square), filter(even)) //=> Seq [ 4, 16 ]
 */


exports.memoize = memoize;

var pipe = function pipe(x) {
  for (var _len12 = arguments.length, chain = new Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
    chain[_key12 - 1] = arguments[_key12];
  }

  return _foldl(function (f, v) {
    return f(v);
  }, x, chain);
};
/*
 * liftA2(fn, ap1, ap2)
 *
 * Lifts a regular function of two arguments into a function that can operate on the values of two applicatives.
 *
 * Example:
 *   lift(add, [2, 3], [3, 3])
 *     //=> [5, 5, 6, 6]
 *
 *   lift(conj, Maybe.Some(3), Maybe.Some([1, 2]))
 *     // => Maybe.Some([1, 2, 3])
 */


exports.pipe = pipe;
var liftA2 = curry(function (fn, ap1, ap2) {
  return ap(ap2, _map(fn, ap1));
}, 3);
/*
 * liftA3(fn, ap1, ap2, ap3)
 *
 * Like liftA2 but works with functions of three arguments
 */

exports.liftA2 = liftA2;
var liftA3 = curry(function (fn, ap1, ap2, ap3) {
  return ap(ap3, ap(ap2, _map(fn, ap1)));
}, 4);
/*
 * liftA4(fn, ap1, ap2, ap3, ap4)
 *
 * Like liftA2 but works with functions of four arguments
 */

exports.liftA3 = liftA3;
var liftA4 = curry(function (fn, ap1, ap2, ap3, ap4) {
  return ap(ap4, ap(ap3, ap(ap2, _map(fn, ap1))));
}, 5);
/*
 * liftA5(fn, ap1, ap2, ap3, ap4, ap5)
 *
 * Like liftA2 but works with functions of five arguments
 */

exports.liftA4 = liftA4;
var liftA5 = curry(function (fn, ap1, ap2, ap3, ap4, ap5) {
  return ap(ap5, ap(ap4, ap(ap3, ap(ap2, _map(fn, ap1)))));
}, 6);
/*
 * liftA6(fn, ap1, ap2, ap3, ap4, ap5, ap6)
 *
 * Like liftA2 but works with functions of six arguments
 */

exports.liftA5 = liftA5;
var liftA6 = curry(function (fn, ap1, ap2, ap3, ap4, ap5, ap6) {
  return ap(ap6, ap(ap5, ap(ap4, ap(ap3, ap(ap2, _map(fn, ap1))))));
}, 7); // -- Generic utils

exports.liftA6 = liftA6;
var getOrElse = curry(function (key, fallback, xs) {
  return caseOf({
    Some: id,
    None: function None() {
      return fallback;
    }
  }, get(key, xs));
});
exports.getOrElse = getOrElse;
var getInOrElse = curry(function (path, fallback, xs) {
  return caseOf({
    Some: id,
    None: function None() {
      return fallback;
    }
  }, getIn(path, xs));
});
exports.getInOrElse = getInOrElse;
var foldlKV = curry(function (f, initial, xs) {
  return _foldl(function (k, acc) {
    return f(k, getOrElse(k, void 0, xs), acc);
  }, initial, keys(xs));
});
exports.foldlKV = foldlKV;
var foldrKV = curry(function (f, initial, x) {
  return _foldr(function (k, acc) {
    return f(k, getOrElse(k, void 0, xs), acc);
  }, initial, keys(xs));
});
exports.foldrKV = foldrKV;
var andThen = curry(function (fn, m) {
  return flatten(_map(fn, m));
}, 2); // -- List utils

exports.andThen = andThen;
var join = curry(function (sep, xs) {
  return xs.join(sep);
}, 2);
exports.join = join;
var slice = curry(function (start, end, coll) {
  return coll.slice(start, end);
}, 3);
exports.slice = slice;
var sliceFrom = curry(function (start, coll) {
  return coll.slice(start);
}, 2);
exports.sliceFrom = sliceFrom;
var any = curry(function (f, xs) {
  return _foldl(function (x, acc) {
    return acc ? acc : !!f(x);
  }, false, xs);
}, 2);
exports.any = any;
var every = curry(function (f, xs) {
  return _foldl(function (x, acc) {
    return !acc ? acc : !!f(x);
  }, true, xs);
}, 2); // -- Collection Utils

/*
 * join(sep, str)
 *
 * Joins a list of strings into a single string separated by a character
 */

exports.every = every;
var filterKV = curry(function (f, xs) {
  return foldlKV(function (k, v, acc) {
    return f(k, v) ? conj(v, acc) : acc;
  }, _empty(xs), xs);
}, 2);
exports.filterKV = filterKV;
var filter = curry(function (f, xs) {
  return filterKV(function (k, v) {
    return f(v);
  }, xs);
}, 2);
exports.filter = filter;
var removeKV = curry(function (f, coll) {
  return filterKV(f, coll);
}, 2);
exports.removeKV = removeKV;
var remove = curry(function (f, coll) {
  return removeKV(function (k, v) {
    return f(v);
  }, coll);
}, 2);
exports.remove = remove;
var take = curry(function (n, xs) {
  var vals = [];
  if (n === 0) return vals;

  var _iterator2 = _createForOfIteratorHelper(iterator(xs)),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var val = _step2.value;
      vals = conj(val, vals);
      if (count(vals) === n) break;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return vals;
}, 2);
exports.take = take;
var into = curry(function (to, from) {
  return _foldl(conj, to, from);
}, 2);
/* getIn(key: [Number | String] | String, obj: Any) => Maybe
 *
 * If key is found in obj it returns the key wrapped in a Some,
 * otherwise a None is returned
 *
 *   Examples:
 *
 *     { x: { y: 'z' } }::getIn(['x', 'y']) //=> Maybe.Some('z')
 *     { x: {} }::getIn(['x', 'y'])         //=> Maybe.None( )
 *
 *     [ [ ['a', 'b'], ['c', 'd'] ] ]::getIn([0, 1, 0]) //=> Maybe.Some('c')
 *     []::getIn([0, 1, 0])                             //=> Maybe.None( )
 *
 */

exports.into = into;
var getIn = curry(function (_ref8, obj) {
  var _ref9 = _toArray(_ref8),
      key = _ref9[0],
      rest = _ref9.slice(1);

  return count(rest) === 0 ? get(key, obj) : caseOf({
    Some: function Some(x) {
      return getIn(rest, x);
    },
    None: function None() {
      return get(key, obj);
    }
  }, get(key, obj));
}, 2);
/* assocIn(path: [Number | String], value: Any, obj: Any) => Any
 *
 * Like assoc but accepts a path instead of a single key
 *
 */

exports.getIn = getIn;
var assocIn = curry(function (_ref10, val, obj) {
  var _ref11 = _toArray(_ref10),
      key = _ref11[0],
      rest = _ref11.slice(1);

  return count(rest) === 0 ? _assoc(key, val, obj) : caseOf({
    Some: function Some(x) {
      return _assoc(key, assocIn(rest, val, x), obj);
    },
    None: function None() {
      return _assoc(key, assocIn(rest, val, _empty(obj)), obj);
    }
  }, get(key, obj));
}, 3);
/* dissocIn(key: [Number | String], obj: Any) => Any
 *
 * Like dissoc but accepts a path instead of a single key
 *
 */

exports.assocIn = assocIn;
var dissocIn = curry(function (_ref12, obj) {
  var _ref13 = _toArray(_ref12),
      key = _ref13[0],
      rest = _ref13.slice(1);

  return count(rest) === 0 ? _dissoc(key, obj) : caseOf({
    Some: function Some(x) {
      return _assoc(key, dissocIn(rest, x), obj);
    },
    None: function None() {
      return _assoc(key, dissocIn(rest, _empty(obj)), obj);
    }
  }, get(key, obj));
}, 2);
/* mapError(f: Function, m: IBifunctor) => IBifunctor
 *
 * Maps a function over the error case of an IBifunctor instance
 *
 * Example:
 *
 * Result.Err("foo")::mapError(x => x + "!!!") //=> Result.Err("foo!!!")
 *
 * Task((fail, succeed) => fail("it failed"))::mapError(x => x + "!!!").fork(
 *  error => console.log('error:', error)
 *  value => console.log('value:', value)
 * ) // => "error: it failed!!!"
 */

exports.dissocIn = dissocIn;

var mapError = function mapError(f, m) {
  return bimap(f, identity, m);
};
/* evolve(transformations: Object, coll: Object) => Object
 *
 * Given an object and a "receipt" of changes it returns a
 * new copy of the original collection with the changes applied.
 * Throws an error if a key in the "receipt" doesn't exist in th collection
 *
 * Example:
 *
 * const state = { counters: { counterA: 0, counterB: 0, counterC: 0 } }
 *
 * state::evolve({ counters: { counterA: 4, counterB: plus(20) } })
 *   //=> { counters: { counterA: 4, counterB: 20, counterC: 0 } }
 *
 * state::evolve({ counters: { counterA: 4, counterD: plus(20) } })
 *   //=> TypeError: Unable to find path: [ "counters", "counterD" ] in { counters: { counterA: 0, counterB: 0, counterC: 0 } }
 */


exports.mapError = mapError;
var evolve = curry(function (transformations, object) {
  return foldlKV(function (key, val, acc) {
    if (val.constructor === Object && !is(Union, val) && !is(Type, val)) {
      return _assoc(key, evolve(val, getOrElse(key, _empty(acc), object)), acc);
    } else if (typeof val === "function") {
      return _assoc(key, val(getOrElse(key, void 0, acc)), acc);
    } else {
      return _assoc(key, val, acc);
    }
  }, object, transformations);
}, 2);
exports.evolve = evolve;
var vals = curry(function (xs) {
  return _foldl(function (val, acc) {
    return _append(val, acc);
  }, [], xs);
});
exports.vals = vals;
var kvp = curry(function (xs) {
  return foldlKV(function (key, val, acc) {
    return conj([[key, val]], acc);
  }, [], xs);
});
/*
 * zip(...xs)
 *
 * Merges together the values of multiple seqables with the values at the corresponding position.
 *
 * Example:
 *
 *   zip(['x', 'y'], [1, 2])  //=> [['x', 1], ['y', 2]]
 *   zip(['x', 'y'], Range()) //=> [['x', 1], ['y', 2]]
 */

exports.kvp = kvp;

var zip = function zip() {
  for (var _len13 = arguments.length, xs = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
    xs[_key13] = arguments[_key13];
  }

  var shortest = _foldl(function (x, acc) {
    return count(x) < count(acc) ? x : acc;
  }, getOrElse(0, [], xs), xs);

  return foldlKV(function (k, v, acc) {
    return _append([_map(getOrElse(k, void 0), xs)], acc);
  }, [], shortest);
};
/*
 * Value equality check with semantics similar to Object.is,
 * but treats Immutable Iterables as values,
 * equal if the second Iterable includes equivalent values.
 */


exports.zip = zip;
var equal = curry(function (a, b) {
  return a === b;
}, 2);
exports.equal = equal;
var shallowEqual = curry(function (a, b) {
  if (a == null || b == null) return false;
  if (implementsProtocol(ILookup, a) && implementsProtocol(IKeyed, b)) return foldlKV(function (k, v, acc) {
    return !acc ? acc : equal(v, getOrElse(k, false, a));
  }, true, b);else return equal(b, a);
}, 2);
exports.shallowEqual = shallowEqual;
var deepEqual = curry(function (a, b) {
  if (a == null || b == null) return false;
  if (is(String, a) || is(String, b)) return equal(b, a);

  if (implementsProtocol(ILookup, a) && implementsProtocol(IKeyed, b)) {
    return foldlKV(function (k, v, acc) {
      return !acc ? acc : deepEqual(v, getOrElse(k, false, a));
    }, true, b);
  } else return equal(b, a);
}, 2); // -- String Utils

/*
 * split(sep, str)
 *
 * Splits a string into a list of strings
 */

exports.deepEqual = deepEqual;
var split = curry(function (sep, str) {
  return str.split(sep);
}, 2);
/*
 * replace(pattern, replacement, str)
 *
 * Replaces occurrances of pattern in str with the replacement string.
 */

exports.split = split;
var replace = curry(function (pattern, replacement, str) {
  return str.replace(pattern, replacement);
}, 3);
/*
 * lowercase(str)
 *
 * Returns the source string in all lowercase.
 */

exports.replace = replace;

var lowercase = function lowercase(str) {
  return str.toLowerCase();
};
/*
 * uppercase(str)
 *
 * Returns the source string in all uppercase.
 */


exports.lowercase = lowercase;

var uppercase = function uppercase(str) {
  return str.toUpperCase();
};

exports.uppercase = uppercase;
