"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contains = exports.capitalize = exports.uppercase = exports.lowercase = exports.replace = exports.split = exports.div = exports.times = exports.plus = exports.gt = exports.lt = exports.deepEqual = exports.equal = exports.not = exports.comp = exports.flip = exports.evolve = exports.isEmpty = exports.dissocIn = exports.assocIn = exports.getInOrElse = exports.getIn = exports.getOrElse = exports.every = exports.any = exports.remove = exports.removeKV = exports.filter = exports.filterKV = exports.mapKV = exports.flatMap = exports.sequenceA = exports.liftA6 = exports.liftA5 = exports.liftA4 = exports.liftA3 = exports.liftA2 = exports.mapError = exports.implementsExtension = exports.id = exports.slice = exports.join = exports.keys = exports.ap = exports.flatten = exports.pure = exports.dissoc = exports.assoc = exports.bimap = exports.map = exports.foldr = exports.foldl = exports.foldrKV = exports.foldlKV = exports.rest = exports.first = exports.get = exports.count = exports.append = exports.empty = exports.shallowClone = exports.clone = exports.caseOf = exports.Task = exports.result = exports.Result = exports.maybe = exports.Maybe = exports.Union = exports.Type = exports.docstr = exports.Dispatch = exports.extendType = exports.Fun = exports.is = exports.curry = exports.show = exports.showType = exports.getType = exports.dispatchMap = exports.Spread = exports.Implements = exports.OneOf = exports.Null = exports.Any = exports.__ = exports.UnionValues = exports.UnionCase = exports.UnionCases = exports.UnionType = exports.TypeConstructor = exports.CustomType = exports.KindKey = exports.TypeKeys = exports.TypeKey = exports.ProtocolSym = void 0;

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var ProtocolSym = '____Protocol';
exports.ProtocolSym = ProtocolSym;
var TypeKey = '____TypeKey';
exports.TypeKey = TypeKey;
var TypeKeys = '____TypeKeys';
exports.TypeKeys = TypeKeys;
var KindKey = '____KindKey';
exports.KindKey = KindKey;
var CustomType = '____CustomType';
exports.CustomType = CustomType;
var TypeConstructor = '____TypeConstructor';
exports.TypeConstructor = TypeConstructor;
var UnionType = '____UnionType';
exports.UnionType = UnionType;
var UnionCases = '____UnionCases';
exports.UnionCases = UnionCases;
var UnionCase = '____UnionCase';
exports.UnionCase = UnionCase;
var UnionValues = '____UnionValues';
exports.UnionValues = UnionValues;
var __ = {
  kind: 'Placeholder'
};
exports.__ = __;
var Any = {
  kind: 'Any'
};
exports.Any = Any;
var Null = {
  kind: 'Null'
};
exports.Null = Null;

var OneOf = function OneOf(types) {
  return {
    kind: 'OneOf',
    types: types
  };
};

exports.OneOf = OneOf;

var Implements = function Implements() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return {
    kind: 'Implements',
    fns: fns
  };
};

exports.Implements = Implements;

var ObjectWithPlaceholder = function ObjectWithPlaceholder(obj) {
  return {
    kind: 'ObjectWithPlaceholder',
    obj: obj
  };
};

var Spread = function Spread(type) {
  return {
    kind: 'Spread',
    type: type
  };
};

exports.Spread = Spread;
var dispatchMap = {};
exports.dispatchMap = dispatchMap;

var withMeta = function withMeta(x, meta) {
  x.___meta___ = x.___meta___ || {};
  Object.keys(meta).forEach(function (key) {
    x.___meta___[key] = meta[key];
  });
  return x;
};

var getType = function getType(implementor) {
  if (implementor == null) return Null;
  return implementor.constructor;
};

exports.getType = getType;

var showType = function showType(T) {
  if (T == null) return 'Null';
  if (T === Any) return 'Any';

  if (T.kind === 'OneOf') {
    return "OneOf([ ".concat(T.types.map(function (t) {
      if (typeof t === 'function' || t[TypeKey] || t[UnionType] || t._tag) {
        return showType(t);
      } else {
        return show(t);
      }
    }).join(', '), " ]) >");
  }

  if (T._tag === 'TypedUnion') {
    return "".concat(T._name, "(").concat(T._types.map(showType).join(', '), ")");
  }

  if (T.kind === 'ObjectWithPlaceholder') {
    return showType(T.obj);
  }

  if (T.kind === 'Spread') {
    return "Spread(".concat(showType(T.type), ")");
  }

  if (T.kind === 'Implements') {
    return "Implements([ ".concat(T.fns.map(function (f) {
      return show(f);
    }).join(', '), " ])");
  }

  if (T === String || typeof T === 'string') return 'String';
  if (T === Number || typeof T === 'number') return 'Number';
  if (T === Boolean) return 'Boolean';
  if (T === RegExp || T instanceof RegExp) return 'RegExp';
  if (T === Array) return 'Array';
  if (T === Object) return 'Object';
  if (T === Map) return 'Map';
  if (T === WeakMap) return 'WeakMap';
  if (T === Set) return 'Set';
  if (T === WeakSet) return 'WeakSet';

  if (T.constructor !== Function) {
    var mapper = dispatchMap[showType(getType(T))] || {};

    if (typeof mapper.showType === 'function') {
      return mapper.showType(T);
    }
  }

  if (Array.isArray(T)) {
    return "[ ".concat(T.map(showType).join(', '), " ]");
  }

  if (T[KindKey] === CustomType) return T[TypeKey];

  if (T[KindKey] === UnionType) {
    if (T[UnionCase]) return "".concat(T[TypeKey], ".").concat(T[UnionCase]);else return T[TypeKey];
  }

  if (T === Function) return 'Function';

  if (typeof T === 'function' && T.name) {
    return T.name;
  }

  if (T.constructor === Object) return "{ ".concat(Object.keys(T).map(function (key) {
    return "".concat(key, ": ").concat(showType(T[key]));
  }).join(', '), " }");
  if (typeof T === 'string') return "\"".concat(T, "\"");
  return T.toString().replace(/function\s*/, '').replace(/\(\)/, '').replace(/\{\s\[native code\]\s\}/, '').replace(/\{\}/, '').replace(/\s*/g, '');
};

exports.showType = showType;
var show = withMeta(function (x) {
  if (x === null) {
    return 'null';
  }

  if (x === undefined) {
    return 'undefined';
  }

  if (Array.isArray(x)) {
    return "[ ".concat(x.map(show).join(', '), " ]");
  }

  if (typeof x === 'string') {
    return "\"".concat(x, "\"");
  }

  if (typeof x === 'function') {
    if (x.___meta___ && x.___meta___.name) {
      return "<function ".concat(x.___meta___.name, ">");
    } else {
      return "<function>";
    }
  }

  if (x[KindKey] === CustomType) {
    return "".concat(x[TypeKey], "(").concat(x[TypeKeys].map(function (key) {
      return show(x[key]);
    }).join(', '), ")");
  }

  if (x[KindKey] === UnionType) {
    return "".concat(x[TypeKey], ".").concat(x[UnionCase], "(").concat(x[UnionValues].map(show).join(', '), ")");
  }

  if (is(Object, x)) {
    return "{ ".concat(Object.keys(x).map(function (key) {
      return "".concat(key, ": ").concat(show(x[key]));
    }).join(', '), " }");
  }

  if (is(Map, x)) {
    var entries = [];

    var _iterator = _createForOfIteratorHelper(x.entries()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
            key = _step$value[0],
            val = _step$value[1];

        entries.push("".concat(show(key), ": ").concat(show(val)));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return "Map { ".concat(entries.join(', '), " }");
  }

  if (is(WeakMap, x)) {
    return 'WeakMap {}';
  }

  if (is(Set, x)) {
    var values = [];

    var _iterator2 = _createForOfIteratorHelper(x.values()),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _val = _step2.value;
        values.push(show(_val));
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return "Set { ".concat(values.join(', '), " }");
  }

  if (is(WeakSet, x)) {
    return 'WeakSet {}';
  }

  var mapper = dispatchMap[showType(getType(x))] || {};

  if (typeof mapper.show === 'function') {
    return mapper.show(x);
  }

  return x.toString();
}, {
  name: 'show',
  docs: {
    declaration: 'Any -> String',
    docstr: 'Returns the string representation of an object'
  }
});
exports.show = show;
var curry = withMeta(function (f, n) {
  var arity = n == null ? f.length : n;
  var name = f.___meta___ && f.___meta___.name ? f.___meta___.name : f.name;
  var declaration = f.___meta___ ? f.___meta___.declaration : [];
  var docs = f.___meta___ ? f.___meta___.docs : {};
  if (arity < 2) return withMeta(f, {
    name: name,
    declaration: declaration,
    docs: docs
  });
  return withMeta(function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var filteredArgs = args.filter(function (arg) {
      return arg !== __;
    });
    var realArity = filteredArgs.length;
    if (realArity >= arity) return f.apply(void 0, args);else {
      var curriedFn = function curriedFn() {
        var newArgs = [];

        for (var _len3 = arguments.length, partialArgs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          partialArgs[_key3] = arguments[_key3];
        }

        for (var i = 0; i < args.length; i++) {
          if (args[i] === __) {
            newArgs[i] = partialArgs.shift() || __;
          } else {
            newArgs[i] = args[i];
          }
        }

        var argsToApply = newArgs.concat(partialArgs);

        if (argsToApply.filter(function (arg) {
          return arg !== __;
        }).length < arity) {
          return withMeta(curry(function () {
            var newArgs = [];

            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }

            for (var _i2 = 0; _i2 < argsToApply.length; _i2++) {
              if (argsToApply[_i2] === __) {
                newArgs[_i2] = args.shift() || __;
              } else {
                newArgs[_i2] = argsToApply[_i2];
              }
            }

            return f.apply(void 0, _toConsumableArray(newArgs.concat(args)));
          }, arity - argsToApply.filter(function (arg) {
            return arg !== __;
          }).length), {
            name: process.NODE_ENV === 'production' ? name : "".concat(name, "(").concat(argsToApply.map(function (arg) {
              return arg === __ ? '__' : show(arg);
            }).join(', '), ")"),
            declaration: declaration,
            docs: docs
          });
        } else {
          return f.apply(void 0, _toConsumableArray(argsToApply));
        }
      };

      return withMeta(curriedFn, {
        name: process.NODE_ENV === 'production' ? name : "".concat(name, "(").concat(args.map(function (arg) {
          return arg === __ ? '__' : show(arg);
        }).join(', '), ")"),
        declaration: declaration,
        docs: docs
      });
    }
  }, {
    name: name,
    declaration: declaration,
    docs: docs
  });
}, {
  name: 'curry',
  docs: {
    declaration: 'Function -> Number? -> Function',
    docstr: "\n        Returns a curried version of a function\n\n        | Example:\n        |\n        |   const times    = curry((a, b) => a * b);\n        |   const timesTwo = times(2);\n        |   const mod2     = mod(__, 2); // __ can be used as a placeholder for partial application\n        |\n        |   times(2, 4) //=> 8\n        |   times(2)(4) //=> 8\n        |   timesTwo(4) //=> 8\n        |\n        |   mod2(2)     //=> 0\n        |   mod2(3)     //=> 1\n"
  }
});
exports.curry = curry;
var is = withMeta(curry(function (type, obj) {
  if (type == null) return obj == null;
  if (type === Any) return true;
  if (obj == null && type === Null) return true;
  if (obj == null && type !== Null) return false;
  if (obj != null && type === Null) return false;

  if (type === Array) {
    return Array.isArray(obj);
  }

  if (type === Object) {
    return obj.constructor === Object;
  }

  if (type === Function && typeof obj === 'function') return true;
  if (type === obj) return true;
  var mapper = dispatchMap[showType(type)] || dispatchMap[showType(getType(type))] || {};

  if (typeof mapper.is === 'function') {
    return mapper.is(type, obj);
  }

  if (type.kind === 'OneOf') {
    return type.types.some(is(__, obj));
  }

  if (type.kind === 'Implements') {
    var objType = showType(getType(obj));

    if (dispatchMap[objType]) {
      return type.fns.every(function (fn) {
        return !!dispatchMap[objType][fn];
      });
    } else {
      return type.fns.length === 0;
    }

    return type.types.some(is(__, obj));
  }

  if (type.kind === 'ObjectWithPlaceholder') {
    return typeof obj._ === 'function' || Object.keys(type.obj).every(function (key) {
      return is(type.obj[key], obj[key]);
    });
  }

  if (type[TypeKey] != null && type[TypeKey] === obj[TypeKey] && obj[KindKey] === CustomType) return true;
  if (obj[KindKey] === UnionType && (!type[UnionCase] || type[UnionCase] === obj[UnionCase]) && (obj[TypeKey] === type[TypeKey] || type[TypeKey] === undefined)) if (type._tag === 'TypedUnion') {
    return obj[TypeKey] === type._name && obj[UnionValues].every(function (t, i) {
      return is(type._types[i], t);
    });
  } else {
    return true;
  }

  if (Array.isArray(type) && Array.isArray(obj) && type.length === 1) {
    return obj.every(is(type[0]));
  }

  if (type.constructor === Object && obj.constructor === Object) {
    return Object.keys(type).every(function (key) {
      return is(type[key], obj[key]);
    });
  }

  if (type[ProtocolSym] && type[ProtocolSym].is) {
    return type[ProtocolSym].is(type, obj);
  }

  return obj.constructor === type;
}, 2), {
  name: 'is',
  docs: {
    declaration: 'Any -> Any -> Boolean',
    docstr: 'Checks if a value is of a given type'
  }
});
exports.is = is;

var Fun = function Fun(name, typeDecl, docstr, fn) {
  if (process.env.NODE_ENV === 'production') return curry(fn, typeDecl.length - 1);

  if (!is(Array, typeDecl)) {
    throw new TypeError("\nEncountered an error during the folowing function definition:\n\nconst ".concat(name, " = Fun(\n  > ,\n  ...\n)\n\n    - Expected a list of type declarations\n"));
  }

  if (!is(String, docstr)) {
    throw new TypeError("\nEncountered an error during the folowing function definition:\n\nconst ".concat(name, " = Fun(\n  [ ").concat(typeDecl.map(showType).join(', '), " ],\n  > ,\n  (...) => { ... }\n)\n\n    - Expected a documentation string\n"));
  }

  if (!is(Function, fn)) {
    throw new TypeError("\nEncountered an error during the folowing function definition:\n\nconst ".concat(name, " = Fun(\n  [ ").concat(typeDecl.map(showType).join(', '), " ],\n  ").concat(show(docstr), ",\n  >\n)\n\n    - Expected a function expression\n"));
  }

  var types = typeDecl.slice(0, fn.length);
  var returnType = typeDecl[fn.length];

  if (typeDecl.length === fn.length) {
    throw new TypeError("\nEncountered an error during the folowing function definition:\n\nconst ".concat(name, " = Fun(\n  [ ").concat(typeDecl.map(showType).join(', '), ", ??? ],\n  \"").concat(docstr, "\",\n  (...) => { ... }\n)\n\n    - Missing return type\n"));
  }

  if (typeDecl.length < fn.length) {
    var missing = [];

    for (var i = 0; i <= fn.length - typeDecl.length; _readOnlyError("i"), i++) {
      missing.push(i);
    }

    throw new TypeError("\nEncountered an error while defining function '".concat(name, "'\n\nconst ").concat(name, " = Fun(\n  [").concat(typeDecl.map(showType).join(', '), ", ").concat(missing.map(function (_) {
      return '???';
    }).join(', '), "],\n\n  ").concat(docstr, ",\n\n  (...) => {...}\n)\n\n  - Missing multiple argument types\n  - Missing return type\n"));
  }

  docstr = docstr.trim().replace(/\ +/g, ' ').replace(/\n\ /g, ' ').replace(/\|/g, '\n|  ');
  var typedFn = curry(withMeta(function () {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    var strArgs = args.map(show);
    var errors = args.reduce(function (acc, arg, i) {
      if (!is(types[i], arg)) {
        acc[i] = {
          position: i,
          value: show(arg),
          expected: showType(types[i])
        };
      }

      return acc;
    }, {});
    var errorSigns = strArgs.map(function (arg, i) {
      if (errors[i]) {
        return arg.split('').map(function (_) {
          return '^';
        }).join('');
      } else {
        return arg.split('').map(function (_) {
          return ' ';
        }).join('');
      }
    });
    var invocation = "".concat(name, "(").concat(strArgs.join(', '), ")\n").concat(name.split('').map(function (_) {
      return ' ';
    }).join(''), " ").concat(errorSigns.join('  ').trimEnd());

    if (Object.keys(errors).length) {
      throw new TypeError("\n\nEncountered unexpected types in the following function call:\n\n".concat(invocation, "\n").concat(Object.keys(errors).map(function (key) {
        return errors[key];
      }).map(function (_ref) {
        var value = _ref.value,
            expected = _ref.expected;
        return expected === 'Null' ? "    - Unexpected argument ".concat(value, " has no matching type declaration") : "    - Expected ".concat(value, " to be of type ").concat(expected);
      }).join('\n'), "\n\n"));
    } else {
      var returnValue = fn.apply(void 0, args);

      if (!is(returnType, returnValue)) {
        throw new TypeError("\n\nEncountered unexpected return type from function ".concat(name, " in the following call:\n\n").concat(invocation.trimEnd(), "\n\n    - Expected the returned value ").concat(show(returnValue), " to be of type ").concat(showType(returnType), "\n\n"));
      } else {
        return returnValue;
      }
    }
  }, {
    name: name,
    declaration: typeDecl,
    docs: {
      declaration: typeDecl.map(showType).join(' -> '),
      docstr: docstr
    }
  }), typeDecl.length - 1);
  return withMeta(typedFn, {
    name: name,
    docs: {
      declaration: typeDecl.map(showType).join(' -> '),
      docstr: docstr
    }
  });
};

exports.Fun = Fun;
var getMeta = Fun("getMeta", [String, Any, String], 'Retrieves the metadata associated with a given key', function (key, obj) {
  return obj && obj.___meta___ ? obj.___meta___[key] || '' : typeof obj === 'function' ? obj.name ? "<function: ".concat(obj.name, ">") : '<function: anonymous>' : '';
});

var fnTypeMap = function (typeMap) {
  return {
    read: function read(key) {
      return typeMap[key];
    },
    write: function write(key, T) {
      if (typeMap[key]) {
        if (!typeMap[key].some(function (t) {
          return t === T;
        })) {
          typeMap[key].push(T);
        }
      } else {
        typeMap[key] = [T];
      }
    }
  };
}({});

var extendType = Fun("extendType", [Any, Object, Null], "Extends a type with polymorphic dispatchers.\n\n  | Example:\n  |\n  | extendType(Array, {\n  |   show: Fun(\n  |     [[Implements('show')], String],\n  |\n  |     \"Returns a string representation of an array\",\n  |\n  |     self =>\n  |       `[ ${self::map(show)::join(', ')} ]`\n  |     )\n  | })\n  |\n  | show([1, 2, 3]) // => [ 1, 2, 3 ]\n  |", function (Type, dispatchers) {
  if (Type) {
    var typeName = showType(Type);

    if (dispatchMap[typeName]) {
      dispatchMap[typeName] = _objectSpread(_objectSpread({}, dispatchMap[typeName]), dispatchers);
    } else {
      dispatchMap[typeName] = dispatchers;
    }

    if (process.env.NODE_ENV !== 'production') {
      Object.keys(dispatchers).forEach(function (name) {
        fnTypeMap.write(name, Type);
      });
    }
  }
});
exports.extendType = extendType;
var Dispatch = Fun("Dispatch", [String, {
  arity: Number
}, Function], "Creates a polymorphic dispatcher function", function (name, _ref2) {
  var arity = _ref2.arity;
  return withMeta(curry(function () {
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    var typeArg = args[args.length - 1];
    var Type = typeArg != null ? typeArg[TypeKey] || showType(getType(typeArg)) : 'Null';
    var match = dispatchMap[Type];

    if (match && match[name]) {
      return match[name].apply(match, args);
    } else {
      throw new TypeError("\n\nEncountered a problem with the following call:\n\n".concat(name, "(").concat(args.map(show).join(', '), ")\n\n    - Could not find an extension for function ").concat(name, " on type ").concat(Type, "\n\n"));
    }
  }, arity), {
    name: name,
    docs: {
      declaration: '',
      docstr: ''
    }
  });
});
exports.Dispatch = Dispatch;

var docstr = function docstr(f) {
  var name = f.___meta___ ? f.___meta___.name || f.name : f.name;
  var defaultDocs = {
    declaration: '',
    docstr: ''
  };
  var docs = f.___meta___ ? f.___meta___.docs || defaultDocs : defaultDocs;

  if (fnTypeMap.read(name)) {
    var collectedDocs = fnTypeMap.read(name).map(function (T) {
      return dispatchMap[showType(T)] && dispatchMap[showType(T)][name].___meta___ ? dispatchMap[showType(T)][name].___meta___.docs : {
        declaration: '-',
        docstr: ''
      };
    });
    var decl = collectedDocs.map(function (doc) {
      return doc ? doc.declaration || '' : '';
    });
    docs.declaration = docs.declaration ? [docs.declaration].concat(decl) : decl;

    var _docstr = collectedDocs.map(function (doc) {
      return doc ? doc.docstr || '' : '';
    });

    docs.docstr = docs.docstr ? [docs.docstr].concat(_docstr) : _docstr;
  }

  if (is(Array, docs.declaration)) {
    return "\n".concat(docs.declaration.map(function (decl, i) {
      return "".concat(name, " : ").concat(decl, "\n\n").concat(docs.docstr[i]);
    }).join('\n\n'), "\n");
  } else {
    return "".concat(docs.declaration, "\n\n").concat(docs.docstr);
  }
};
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


exports.docstr = docstr;

var Type = function Type(name, spec) {
  var specKeys = Object.keys(spec);
  var constructor = curry(function () {
    var _objectSpread2;

    for (var _len7 = arguments.length, values = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      values[_key7] = arguments[_key7];
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
      throw new TypeError("Invalid types passed into the ".concat(name, "(").concat(showType(spec), ") constructor:\n").concat(errors.map(function (_ref3) {
        var key = _ref3.key,
            type = _ref3.type,
            val = _ref3.val;
        return "  * Field: ".concat(key, " - expected value of type ").concat(showType(type), " but got a value of type ").concat(Array.isArray(val) ? showType([val[0]]) : showType(val), " (").concat(show(val), ")");
      }).join('\n'), "\n"));
    }

    var type = _objectSpread((_objectSpread2 = {}, _defineProperty(_objectSpread2, TypeKey, name), _defineProperty(_objectSpread2, TypeKeys, specKeys), _defineProperty(_objectSpread2, KindKey, CustomType), _defineProperty(_objectSpread2, "constructor", constructor), _objectSpread2), data);

    return type;
  }, specKeys.length);
  constructor[KindKey] = CustomType;
  constructor[TypeKey] = name;
  var oneOfKeys = OneOf(specKeys);
  var keyTypes = process.env.NODE_ENV === 'production' ? [] : Object.values(specKeys.reduce(function (acc, key) {
    return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, showType(spec[key]), spec[key]));
  }, {}));
  extendType(constructor, {
    count: Fun("count", [constructor, Number], "Returns the number of keys defined on ".concat(showType(constructor)), function (type) {
      return type[TypeKeys].length;
    }),
    get: Fun("get", [specKeys.length === 1 ? specKeys[0] : OneOf(specKeys), constructor, Maybe(keyTypes.length === 1 ? keyTypes[0] : OneOf(keyTypes))], "Returns the value associated with the key on ".concat(showType(constructor), " wrapped in a maybe"), function (key, type) {
      return maybe(type[key]);
    }),
    assoc: Fun("assoc", [specKeys.length === 1 ? specKeys[0] : OneOf(specKeys), keyTypes.length === 1 ? keyTypes[0] : OneOf(keyTypes), constructor, constructor], "Associates a new value with a given key", function (key, val, type) {
      return constructor.apply(void 0, _toConsumableArray(map(function (k) {
        return k === key ? val : type[k];
      }, specKeys)));
    }),
    keys: Fun("keys", [constructor, [String]], "Returns an array of the keys defined on ".concat(showType(constructor)), function (type) {
      return type[TypeKeys];
    }),
    vals: Fun("vals", [constructor, [keyTypes.length === 1 ? keyTypes[0] : OneOf(keyTypes)]], "Returns an array of the values defined on ".concat(showType(constructor)), function (type) {
      return type[TypeKeys].map(function (key) {
        return type[key];
      });
    })
  });
  return constructor;
}; // -- Union


exports.Type = Type;

var Union = function Union(name, spec) {
  var specKeys = Object.keys(spec);

  function _Union() {
    for (var _len8 = arguments.length, types = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      types[_key8] = arguments[_key8];
    }

    if (!(this instanceof _Union)) {
      return _construct(_Union, types);
    }

    this._name = name;
    this._tag = 'TypedUnion';
    this._types = types;
  }

  _Union[TypeKey] = name;
  _Union[UnionCases] = specKeys;
  _Union[KindKey] = UnionType;
  var specType = specKeys.reduce(function (acc, key) {
    return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, Function));
  }, {});
  return specKeys.reduce(function (acc, key, i) {
    var _case = curry(function () {
      var _ref4;

      for (var _len9 = arguments.length, vals = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        vals[_key9] = arguments[_key9];
      }

      var hasErrors = spec[key].some(function (type, i) {
        return !is(type, vals[i]);
      });

      if (hasErrors) {
        throw new TypeError("Type mismatch: Type ".concat(name, ".").concat(key, "(").concat(spec[key].map(showType).join(', '), ") was invoked with incompatible types: ").concat(name, ".").concat(key, "(").concat(vals.map(show).join(', '), ")"));
      }

      return _ref4 = {}, _defineProperty(_ref4, TypeKey, name), _defineProperty(_ref4, UnionCase, key), _defineProperty(_ref4, KindKey, UnionType), _defineProperty(_ref4, UnionCases, specKeys), _defineProperty(_ref4, UnionValues, vals), _defineProperty(_ref4, "constructor", _Union), _ref4;
    }, spec[key].length);

    _case[TypeKey] = name;
    _case[KindKey] = UnionType;
    _case[UnionCase] = key;
    acc[key] = _case;
    extendType(_Union, {
      caseOf: Fun("caseOf", [Array, _Union, Any], "Adds pattern matching capabilities to ".concat(name), function (pattern, value) {
        var match, wildcard;

        var _iterator3 = _createForOfIteratorHelper(pattern),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _step3$value = _slicedToArray(_step3.value, 2),
                matcher = _step3$value[0],
                fn = _step3$value[1];

            if (matcher === value[UnionCase]) {
              match = fn.apply(void 0, _toConsumableArray(value[UnionValues]));
              break;
            }

            if (matcher === __) {
              match = fn.apply(void 0, _toConsumableArray(value[UnionValues]));
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        if (process.env.NODE_ENV !== 'production') {
          var hasCases = value[UnionCases].every(function (_case) {
            return pattern.some(function (_ref5) {
              var _ref6 = _slicedToArray(_ref5, 1),
                  matcher = _ref6[0];

              return matcher === _case || matcher === __;
            });
          });

          if (!hasCases) {
            patternError(value, pattern, "Missing matcher for the following cases: ".concat(value[UnionCases].filter(function (_case) {
              return !pattern.some(function (_ref7) {
                var _ref8 = _slicedToArray(_ref7, 1),
                    matcher = _ref8[0];

                return matcher === _case;
              });
            }).join(', ')));
          }
        }

        return match;
      })
    });
    return acc;
  }, _Union);
}; // -- Core Types


exports.Union = Union;
var Maybe = Union("Maybe", {
  Some: [Any],
  None: []
});
exports.Maybe = Maybe;
Maybe.get = Fun('Maybe.get', [Any, Maybe, Any], "Extracts the value out of a Maybe if it exists,\n  returns the fallback otherwise.", function (fallback, maybe) {
  return caseOf([["Some", function (x) {
    return x;
  }], ["None", function () {
    return fallback;
  }]], maybe);
});
var maybe = Fun("maybe", [Any, Maybe(Any)], 'Wraps an optional value in a Maybe', function (x) {
  return x == null ? Maybe.None() : Maybe.Some(x);
});
exports.maybe = maybe;
var Result = Union("Result", {
  Ok: [Any],
  Err: [Any]
});
exports.Result = Result;
Result.get = Fun('Result.get', [Result, Any], 'Returns the value wrapped inside a result', function (result) {
  return caseOf([["Ok", function (x) {
    return x;
  }], ["Err", function (x) {
    return x;
  }]], result);
});
var result = Fun("result", [Any, Any, Result(Any)], 'Returns a Result.Ok if ok value is non null Result.Err with the error value otherwise', function (ok, err) {
  return ok == null ? Result.Err(err) : Result.Ok(ok);
});
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
 *     ::flatMap(x => Task.of(x + " task!!"))
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
Task.fail = Fun('Task.fail', [Any, Task], 'Creates a Task that will always fail', function (x) {
  return Task(function (fail, _) {
    return fail(x);
  });
});
Task.succeed = Fun('Task.succeed', [Any, Task], 'Creates a Task that will always succeed', function (x) {
  return Task(function (_, succeed) {
    return succeed(x);
  });
});
/* Task.none
 *
 * A task that does nothing
 */

Task.none = Task(function (_f, _s) {});
Task.perform = Fun('Task.perform', [Task, Function, Function, Task], 'Transforms a regular task into one that always succeeds', function (task, error, success) {
  return Task(function (_, succeed) {
    return task.fork(function (err) {
      return succeed(err != null ? error(err) : error());
    }, function (val) {
      return succeed(val != null ? success(val) : success());
    });
  });
});
/* Task.try(task: Task, success: Function) => Task
 *
 * Like Task.perform but ignores the failure case
 *
 */

Task["try"] = Fun('Task.try', [Task, Function, Task], 'Like task.perform but ignores the failure case', function (task, success) {
  return Task(function (_, succeed) {
    return task.fork(function (err) {}, function (val) {
      return succeed(val != null ? success(val) : success());
    });
  });
});
Task.toPromise = Fun('Task.toPromise', [Task, Promise], 'Converts a task into a promise', function (t) {
  return new Promise(function (succeed, fail) {
    return t.fork(fail, succeed);
  });
});
Task.fromPromise = Fun('Task.fromPromise', [Promise, Task], 'Converts a promise into a task', function (p) {
  return Task(function (fail, succeed) {
    p.then(succeed)["catch"](fail);
  });
});
Task.parallel = Fun('Task.parallel', [[Task], Task], "Runs a list of tasks in parallel and returns a new task that resolves to a list of values", function (tasks) {
  return Task(function (fail, succeed) {
    return Promise.all(IFunctor.map(tasks, Task.toPromise)).then(succeed)["catch"](fail);
  });
});
var Num = Type("Num", {
  predicate: Function
});
var Str = Type("Str", {
  predicate: Function
});
var Arr = Type("Arr", {
  predicate: Function
});
var Obj = Type("Obj", {
  predicate: Function
}); // -- Dispatch methods

var caseOf = Dispatch("caseOf", {
  arity: 2
});
exports.caseOf = caseOf;
var clone = Dispatch("clone", {
  arity: 1
});
exports.clone = clone;
var shallowClone = Dispatch("shallowClone", {
  arity: 1
});
exports.shallowClone = shallowClone;
var empty = Dispatch("empty", {
  arity: 1
});
exports.empty = empty;
var append = Dispatch("append", {
  arity: 2
});
exports.append = append;
var count = Dispatch("count", {
  arity: 1
});
exports.count = count;
var get = Dispatch("get", {
  arity: 2
});
exports.get = get;
var first = Dispatch("first", {
  arity: 1
});
exports.first = first;
var rest = Dispatch("rest", {
  arity: 1
});
exports.rest = rest;
var foldlKV = Dispatch("foldlKV", {
  arity: 3
});
exports.foldlKV = foldlKV;
var foldrKV = Dispatch("foldrKV", {
  arity: 3
});
exports.foldrKV = foldrKV;
var foldl = Dispatch("foldl", {
  arity: 3
});
exports.foldl = foldl;
var foldr = Dispatch("foldr", {
  arity: 3
});
exports.foldr = foldr;
var map = Dispatch("map", {
  arity: 2
});
exports.map = map;
var bimap = Dispatch("bimap", {
  arity: 3
});
exports.bimap = bimap;
var assoc = Dispatch("assoc", {
  arity: 3
});
exports.assoc = assoc;
var dissoc = Dispatch("dissoc", {
  arity: 2
});
exports.dissoc = dissoc;
var pure = Dispatch("pure", {
  arity: 2
});
exports.pure = pure;
var flatten = Dispatch("flatten", {
  arity: 1
});
exports.flatten = flatten;
var ap = Dispatch("ap", {
  arity: 2
});
exports.ap = ap;
var keys = Dispatch("keys", {
  arity: 1
});
exports.keys = keys;
var join = Dispatch("join", {
  arity: 2
});
exports.join = join;
var slice = Dispatch("slice", {
  arity: 3
});
exports.slice = slice;

var Pattern = function Pattern(T) {
  return Arr(withMeta(function (x) {
    return is(Array, x) && count(x) === 2 && is(OneOf([Function, T, '_', '__', __]), x[0]) && is(Function, x[1]);
  }), {
    name: 'Pattern'
  });
};

var patternError = function patternError(value, pattern) {
  var hint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  throw new TypeError("\nFound a non-exhaustive pattern in the following expression:\n\n".concat(show(value), "::caseOf({\n  ").concat(pattern.map(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
        pattern = _ref10[0],
        func = _ref10[1];

    return "[".concat(show(pattern), "]: (...) => { ... }");
  }).join(',\n  '), "\n})").concat(hint ? "\n\n  - ".concat(hint) : '', "\n  "));
}; // -- Core Extensions


extendType(Num, {
  is: curry(function (type, num) {
    if (type === Num) {
      return is(Number, num);
    } else {
      return is(Number, num) && type.predicate(num);
    }
  }),
  showType: function showType(t) {
    return t === Num ? 'Num' : "Num(".concat(getMeta('name', t.predicate), ")");
  }
});
extendType(Str, {
  is: curry(function (type, str) {
    if (type === Str) {
      return is(String, str);
    } else {
      return is(String, str) && type.predicate(str);
    }
  }),
  showType: function showType(t) {
    return t === Str ? 'Str' : "Str(".concat(getMeta('name', t.predicate), ")");
  }
});
extendType(Arr, {
  is: curry(function (type, xs) {
    if (type === Arr) {
      return is(Array, xs);
    } else {
      return is(Array, xs) && type.predicate(xs);
    }
  }),
  showType: function showType(t) {
    return t === Arr ? 'Arr' : "Arr(".concat(getMeta('name', t.predicate), ")");
  }
});
extendType(Obj, {
  is: curry(function (type, obj) {
    if (type === Obj) {
      return is(Object, obj);
    } else {
      return is(Object, obj) && type.predicate(obj);
    }
  }),
  showType: function showType(t) {
    return t === Obj ? 'Obj' : "Obj(".concat(getMeta('name', t.predicate), ")");
  }
});
extendType(Number, {
  clone: Fun("clone", [Num, Num], 'Returns the same number it was called with', function (num) {
    return num;
  }),
  shallowClone: clone,
  caseOf: Fun("caseOf", [Arr, Num, Any], "Allows for pattern matching on numbers.\n\n    | Example:\n    |\n    | 2::caseOf({\n    |  1: num => 'number one',\n    |  [lt(4)]: num => 'less than four but not 1',\n    |  [__]: num => 'every other number'\n    | })\n    ", function (patterns, num) {
    var match;

    var _iterator4 = _createForOfIteratorHelper(patterns),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _step4$value = _slicedToArray(_step4.value, 2),
            matcher = _step4$value[0],
            fn = _step4$value[1];

        if (num === matcher) {
          match = fn(num);
          break;
        }

        if (typeof matcher === 'function') {
          if (matcher(num)) {
            match = fn(num);
            break;
          }
        }

        if (matcher === __) {
          match = fn(num);
          break;
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    if (process.env.NODE_ENV !== 'production') {
      if (!patterns.some(function (_ref11) {
        var _ref12 = _slicedToArray(_ref11, 1),
            key = _ref12[0];

        return key === __;
      })) {
        patternError(num, patterns, "There are multiple strings that won't be caught by this pattern, add a wildcard or predicate matcher.");
      }
    }

    return match;
  })
});
extendType(Boolean, {
  clone: Fun("clone", [Boolean, Boolean], 'Returns the boolean it was called with', function (bool) {
    return bool;
  }),
  shallowClone: clone,
  caseOf: Fun("caseOf", [Arr, Boolean, Any], "Allows for pattern matching on booleans.\n    Only matches against literal values true, false and __.\n\n    | Example:\n    |\n    | true::caseOf({\n    |  [true]: num => 'its true',\n    |  [false]: num => 'its false',\n    | })\n    ", function (patterns, bool) {
    var match;

    var _iterator5 = _createForOfIteratorHelper(patterns),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _step5$value = _slicedToArray(_step5.value, 2),
            matcher = _step5$value[0],
            fn = _step5$value[1];

        if (bool === matcher) {
          match = fn(bool);
          break;
        }

        if (matcher === __) {
          match = fn(bool);
          break;
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }

    if (process.env.NODE_ENV !== 'production') {
      if (!patterns.some(function (_ref13) {
        var _ref14 = _slicedToArray(_ref13, 1),
            key = _ref14[0];

        return key === __;
      })) {
        if (patterns.length < 2 || !(patterns.some(function (_ref15) {
          var _ref16 = _slicedToArray(_ref15, 1),
              key = _ref16[0];

          return key === true;
        }) && patterns.some(function (_ref17) {
          var _ref18 = _slicedToArray(_ref17, 1),
              key = _ref18[0];

          return key === false;
        }))) {
          patternError(bool, patterns, "There are multiple strings that won't be caught by this pattern, add a wildcard or predicate matcher.");
        }
      }
    }

    return match;
  })
});
extendType(RegExp, {
  clone: Fun("clone", [RegExp, RegExp], 'It returns the same regular expression', function (regex) {
    return regex;
  }),
  shallowClone: clone,
  empty: Fun("empty", [RegExp, RegExp], 'Returns an empty instance of RegExp', function (_) {
    return new RegExp();
  }),
  append: Fun("append", [RegExp, RegExp, RegExp], 'Concatenates two regular expresions', function (r1, r2) {
    var modifiers = "".concat(r1.global || r2.global ? 'g' : '').concat(r1.ignoreCase || r2.ignoreCase ? 'i' : '').concat(r1.multiline || r2.multiline ? 'm' : '');
    return new RegExp(r2.source + r1.source, modifiers);
  })
});
extendType(Date, {
  clone: Fun("clone", [Date, Date], 'Returns a cloned date', function (date) {
    return new Date(date);
  }),
  shallowClone: clone
});
extendType(Array, {
  clone: Fun("clone", [Arr, Arr], 'Returns a deeply cloned array', function (xs) {
    return xs.map(function (x) {
      return clone(x);
    });
  }),
  shallowClone: Fun("shallowClone", [Arr, Arr], 'Returns a shallowly cloned array', function (xs) {
    return xs.slice();
  }),
  count: Fun("count", [Arr, Num], 'Returns the size of an array', function (xs) {
    return xs.length;
  }),
  get: Fun("get", [OneOf([Str, Num]), Arr, Maybe], "Returns a Maybe containing the value at the specified index if it exists or None otherwise\n\n    | Example:\n    |\n    | get(1, [1, 2, 3]) //=> Maybe.Some(2)\n    | get(8, [1, 2, 3]) //=> Maybe.None()\n    ", function (index, xs) {
    return maybe(xs[index]);
  }),
  first: Fun("first", [Array, Maybe(Any)], 'Returns the first element of the array wrapped in a Maybe', function (xs) {
    return get(0, xs);
  }),
  rest: Fun("rest", [Array, Array], 'Returns a new array containing all elements of the original except the first', function (xs) {
    return xs.slice(1);
  }),
  foldlKV: Fun("foldlKV", [Function, Any, Arr, Any], "Transforms an array by running each element, index and an accumulator\n    through a function\n\n    | Example:\n    |\n    | [1, 2, 3]::foldlKV((key, val, acc) => acc + key + val, 0)\n    | // => 9\n    ", function (f, acc, xs) {
    return xs.reduce(function (acc, val, key) {
      return f(key, val, acc);
    }, acc);
  }),
  foldl: Fun("foldl", [Function, Any, Arr, Any], "Transforms an array by running each element and an accumulator\n    through a function\n\n    | Example:\n    |\n    | const sum = foldl((val, acc) => acc + val, 0)\n    | sum([1, 2, 3]) // => 6\n    |\n    | const copy = foldl(append, [])\n    | copy([1, 2, 3]) //=> [1, 2, 3]\n    ", function (f, acc, xs) {
    return foldlKV(function (_, val, acc) {
      return f(val, acc);
    }, acc, xs);
  }),
  foldrKV: Fun("foldrKV", [Function, Any, Arr, Any], "Same as foldlKV but iterates through the array from the right", function (f, acc, xs) {
    return xs.reduceRight(function (acc, val, key) {
      return f(key, val, acc);
    }, acc);
  }),
  foldr: Fun("foldr", [Function, Any, Arr, Any], "Same as foldl but starts from the right\n\n    | Example:\n    |\n    | const reverse = foldr(append, [])\n    | reverse([1, 2, 3]) // => [3, 2, 1]\n    ", function (f, acc, xs) {
    return foldrKV(function (_, val, acc) {
      return f(val, acc);
    }, acc, xs);
  }),
  assoc: Fun("assoc", [OneOf([Num, Str]), Any, Arr, Arr], "Associates an existing index with a new value", function (key, value, xs) {
    var cloned = clone(xs);
    if (key > xs.length) return cloned;
    cloned[key] = value;
    return cloned;
  }),
  dissoc: Fun("dissoc", [OneOf([Str, Num]), Arr, Arr], 'Removes a given index from an array', function (key, xs) {
    return xs.filter(function (item, idx) {
      return idx !== key;
    });
  }),
  map: Fun("map", [Function, Arr, Arr], "Produces a new array by running each element through a\n    transformation function\n\n    | Example:\n    |\n    | ['a', 'b', 'c']::map(append('!')) //=> ['a!', 'b!', 'c!']\n    ", function (f, xs) {
    return xs.map(function (x) {
      return f(x);
    });
  }),
  empty: Fun("empty", [Arr, Arr(withMeta(function (xs) {
    return count(xs) === 0;
  }, {
    name: 'isEmpty'
  }))], 'Returns an empty array', function (xs) {
    return [];
  }),
  append: Fun("append", [Any, Arr, Arr], 'Appends an element to the end of an array', function (x, xs) {
    return xs.concat(is(Array, x) ? [x] : x);
  }),
  pure: Fun("pure", [Any, Arr, [Any]], 'Takes a value and wrapps it in an array', function (val, _) {
    return [val];
  }),
  flatten: Fun("flatten", [Arr, Arr], 'It flattens a nested array', function (xs) {
    return is(Function, xs.flat) ? xs.flat() : xs.reduce(function (acc, x) {
      return acc.concat(x);
    }, []);
  }),
  ap: Fun("ap", [Arr, [Function], Arr], "Applies a list of values to a list of functions.\n\n    | Example:\n    | [add(1), add(2)]::ap([3, 4])\n    | //=> [\n    |   /* 1 + 3 */ 4, /* 1 + 4 */ 5,\n    |   /* 2 + 3 */ 5, /* 2 + 4 */ 6\n    | ]\n    ", function (vals, fns) {
    return flatten(map(function (f) {
      return map(f, vals);
    }, fns));
  }),
  keys: Fun("keys", [Arr, [Num]], 'Returns a list of all the indices', function (xs) {
    return xs.map(function (_, i) {
      return i;
    });
  }),
  join: Fun("join", [Str, [OneOf([Str, Num])], Str], 'Returns a string of each element joined by a separator', function (sep, xs) {
    return xs.join(', ');
  }),
  slice: Fun("slice", [Num, Num, Arr, Arr], 'Returns a new array with only the values between start and end', function (start, end, xs) {
    return xs.slice(start, end);
  }),
  caseOf: Fun("caseOf", [Arr, Arr, Any], "Allows for pattern matching on arrays.\n\n    | Example:\n    |\n    | [1, 2, [3, 4]]::caseOf({\n    |   [[Number]]: xs => 'array with a single number!',\n    |   [x => x.length === 10]: xs => '10 elements!',\n    |   [[Number, Number, [Number, Number]]]: xs => 'Jackpot!'\n    |   [[String, Number, Spread(Number)]]: xs => '[Str, Num, ...Str]'\n    |   [__]: xs => 'every other array'\n    | }) // => 'Jackpot!'\n    ", function (patterns, xs) {
    var match;

    var matchPattern = function matchPattern(matcher, value) {
      if (Array.isArray(matcher) && Array.isArray(value)) {
        var last = matcher[matcher.length - 1];

        if (last && last.kind === 'Spread') {
          matcher = matcher.slice(0, matcher.length - 1);
          return matcher.every(function (item, i) {
            return matchPattern(item, value[i]);
          }) && value.slice(matcher.length).every(function (v) {
            return is(last.type, v);
          });
        } else {
          return matcher.length === value.length && value.every(function (item, i) {
            return matchPattern(matcher[i], item);
          });
        }
      }

      if (is(Object, matcher) && is(Object, value)) {
        return Object.keys(matcher).every(function (key) {
          return matchPattern(value[key], matcher[key]);
        });
      }

      if (is(matcher, value)) {
        return true;
      }

      if (value === matcher) {
        return true;
      }

      if (matcher instanceof RegExp && is(String, value) && string.match(matcher)) {
        return true;
      }

      if (typeof matcher === 'function') {
        if (matcher(value)) {
          return true;
        }
      }

      return false;
    };

    var _iterator6 = _createForOfIteratorHelper(patterns),
        _step6;

    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var _step6$value = _slicedToArray(_step6.value, 2),
            matcher = _step6$value[0],
            fn = _step6$value[1];

        if (matchPattern(matcher, xs)) {
          match = fn(xs);
          break;
        }

        if (matcher === __) {
          match = fn(xs);
          break;
        }
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }

    if (process.env.NODE_ENV !== 'production') {
      if (!patterns.some(function (_ref19) {
        var _ref20 = _slicedToArray(_ref19, 1),
            matcher = _ref20[0];

        return matcher === __;
      })) {
        patternError(xs, patterns, 'Wildcard matcher is required when pattern matching on arrays');
      }
    }

    return match;
  })
});
extendType(String, {
  clone: Fun("clone", [Str, Str], 'Returns a cloned string', function (str) {
    return str;
  }),
  shallowClone: clone,
  count: Fun("count", [Str, Num], 'Returns the size of a string', function (str) {
    return str.length;
  }),
  get: Fun("get", [OneOf([Str, Num]), String, Maybe], "Returns a Maybe containing the character at the specified index if it exists or None otherwise\n\n    | Example:\n    |\n    | get(1, \"bar\") //=> Maybe.Some('a')\n    | get(8, \"bar\") //=> Maybe.None()\n    ", function (index, str) {
    return maybe(str[index]);
  }),
  first: Fun("first", [String, Maybe(String)], 'Returns the first character in a string', function (str) {
    return get(0, str);
  }),
  rest: Fun("rest", [String, String], 'Returns the string with the first character removed', function (str) {
    return str.slice(1);
  }),
  foldlKV: Fun("foldlKV", [Function, Any, Str, Any], "Transforms a string by running each element, index and an accumulator\n    through a function\n\n    | Example:\n    |\n    | 'abc'::foldlKV((k, v, acc) => acc::append([k, v]), [])\n    | // => [[0, 'a'], [1, 'b'], [2, 'c']]\n    ", function (f, acc, str) {
    return foldlKV(function (k, v, acc) {
      return f(k, v, acc);
    }, acc, str.split(''));
  }),
  foldl: Fun("foldl", [Function, Any, Str, Any], "Transforms a string by running each element and an accumulator\n    through a function\n\n    | Example:\n    |\n    | 'abc'::foldl(append, [])\n    | // => ['a', 'b', 'c']]\n    ", function (f, acc, str) {
    return foldl(function (val, acc) {
      return f(val, acc);
    }, acc, str.split(''));
  }),
  foldrKV: Fun("foldrKV", [Function, Any, Str, Any], "Same as foldlKV but iterates through the string from the right", function (f, acc, xs) {
    return foldrKV(function (k, v, acc) {
      return f(k, v, acc);
    }, acc, xs.split(''));
  }),
  foldr: Fun("foldr", [Function, Any, Str, Any], "Same as foldl but starts from the right\n\n    | Example:\n    |\n    | 'abc'::foldr(append, [])\n    | // => ['c', 'b', 'a']]\n    ", function (f, acc, str) {
    return foldr(function (val, acc) {
      return f(val, acc);
    }, acc, str.split(''));
  }),
  assoc: Fun("assoc", [OneOf([Num, Str]), Str, Str, Str], "Associates an existing index with a new value", function (key, value, str) {
    return assoc(key, value, str.split('')).join('');
  }),
  dissoc: Fun("dissoc", [OneOf([Str, Num]), Str, Str], 'Removes a given index from a string', function (key, xs) {
    return dissoc(key, xs.split('')).join('');
  }),
  map: Fun("map", [Function, Str, Str], "Produces a new string by running each element through a\n    transformation function\n\n    | Example:\n    |\n    | 'abc'::map(x => x.toUpperCase()) //=> 'ABC'\n    ", function (f, xs) {
    return map(function (x) {
      return f(x);
    }, xs.split('')).join('');
  }),
  empty: Fun("empty", [Str, Str], 'Returns an empty string', function (_) {
    return '';
  }),
  append: Fun("append", [Str, Str, Str], 'Appends a character to the end of a string', function (_char, str) {
    return str + _char;
  }),
  keys: Fun("keys", [Str, [Num]], 'Returns a list of all the indices', function (xs) {
    return xs.split('').map(function (_, i) {
      return i;
    });
  }),
  join: Fun("join", [String, String, String], 'Joins each character by a separator', function (sep, str) {
    return join(sep, split('', str));
  }),
  slice: Fun("slice", [Number, Number, String, String], 'Returns a new string with only the characters betweed start and end', function (start, end, str) {
    return str.slice(start, end);
  }),
  caseOf: Fun("caseOf", [Arr, Str, Any], "Allows for pattern matching on numbers.\n\n    | Example:\n    |\n    | \"quux\"::caseOf({\n    |  \"foo\": str => 'foo!',\n    |  [x => x.match(/bar/)]: str => 'bar!',\n    |  [/quux/]: str => 'quux!'\n    |  [__]: str => 'every other string'\n    | }) // => 'quux!'\n    ", function (patterns, str) {
    var match;

    var _iterator7 = _createForOfIteratorHelper(patterns),
        _step7;

    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var _step7$value = _slicedToArray(_step7.value, 2),
            matcher = _step7$value[0],
            fn = _step7$value[1];

        if (str === matcher) {
          match = fn(str);
          break;
        }

        if (typeof matcher === 'function') {
          if (matcher(str)) {
            match = fn(str);
            break;
          }
        }

        if (matcher instanceof RegExp) {
          if (str.match(matcher)) {
            match = fn(str);
            break;
          }
        }

        if (matcher === __) {
          match = fn(str);
          break;
        }
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }

    if (process.env.NODE_ENV !== 'production') {
      if (!patterns.some(function (_ref21) {
        var _ref22 = _slicedToArray(_ref21, 1),
            matcher = _ref22[0];

        return matcher === __;
      }) && !patterns.some(function (_ref23) {
        var _ref24 = _slicedToArray(_ref23, 1),
            matcher = _ref24[0];

        return typeof matcher === 'function';
      })) {
        patternError(str, patterns, "There are multiple strings that won't be caught by this pattern, add a wildcard or predicate matcher.");
      }
    }

    if (!match) {
      patternError(str, patterns, "There are multiple strings that won't be caught by this pattern, add a wildcard or predicate matcher.");
    }

    return match;
  })
});
extendType(Object, {
  clone: Fun("clone", [Obj, Obj], 'Returns a cloned object', function (obj) {
    return Object.keys(obj).reduce(function (acc, key) {
      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, clone(obj[key])));
    }, {});
  }),
  shallowClone: Fun("shallowClone", [Obj, Obj], 'Returns a shallowly cloned object', function (obj) {
    return _objectSpread({}, obj);
  }),
  count: Fun("count", [Obj, Num], 'Returns the size of a string', function (obj) {
    return Object.keys(obj).length;
  }),
  get: Fun("get", [OneOf([Str, Num]), Obj, Maybe], "Returns a Maybe containing the value associated with the key if it\n    exists or None otherwise\n\n    | Example:\n    |\n    | get('a', { a: 'A', b: 'B' }) //=> Maybe.Some('A')\n    | get('c', { a: 'A', b: 'B' }) //=> Maybe.None()\n    ", function (key, obj) {
    return maybe(obj[key]);
  }),
  first: Fun("first", [Object, Maybe(Any)], 'Returns the first value of an Object', function (obj) {
    return flatten(map(get(__, obj), get(0, keys(obj))));
  }),
  rest: Fun("rest", [Object, Object], 'Returns the object with the first key removed', function (obj) {
    return foldl(function (key, acc) {
      return assoc(key, obj[key], acc);
    }, {}, keys(obj).slice(1));
  }),
  foldlKV: Fun("foldlKV", [Function, Any, Obj, Any], "Transforms an object by running each element, key and an accumulator\n    through a function\n\n    | Example:\n    |\n    | { a: 'A', b: 'B', c: 'C' }::foldlKV((key, kvp, acc) => acc::append(kvp), [])\n    | // => [['a', 'A'], ['b', 'B'], ['c', 'C']]\n    ", function (f, acc, obj) {
    return Object.keys(obj).reduce(function (acc, key) {
      return f(key, [key, obj[key]], acc);
    }, acc);
  }),
  foldl: Fun("foldl", [Function, Any, Obj, Any], "Transforms an object by running each element and an accumulator\n    through a function\n\n    | Example:\n    |\n    | const sum = foldl(([key, val], acc) => acc + val, 0)\n    | sum({ a: 1, b: 2, c: 3 }) // => 6\n    ", function (f, acc, obj) {
    return foldlKV(function (k, kvp, acc) {
      return f(kvp, acc);
    }, acc, obj);
  }),
  foldrKV: Fun("foldrKV", [Function, Any, Obj, Any], "Same as foldlKV but starts from the right", function (f, acc, obj) {
    return Object.keys(obj).reduceRight(function (acc, key) {
      return f(key, [key, obj[key]], acc);
    }, acc);
  }),
  foldr: Fun("foldr", [Function, Any, Obj, Any], "Same as foldl but starting from the right", function (f, acc, obj) {
    return foldrKV(function (_, kvp, acc) {
      return f(kvp, acc);
    }, acc, obj);
  }),
  assoc: Fun("assoc", [OneOf([Num, Str]), Any, Obj, Obj], "Associates a key with a value", function (key, value, obj) {
    return _objectSpread(_objectSpread({}, obj), {}, _defineProperty({}, key, value));
  }),
  dissoc: Fun("dissoc", [OneOf([String, Number]), Object, Object], 'Removes a given key from an object', function (key, obj) {
    return foldl(function (_ref25, acc) {
      var _ref26 = _slicedToArray(_ref25, 2),
          k = _ref26[0],
          v = _ref26[1];

      return k === key ? acc : append([k, v], acc);
    }, {}, obj);
  }),
  map: Fun("map", [Function, Obj, Obj], "Produces a new object by running each value through a\n    transformation function\n\n    | Example:\n    |\n    | { a: 1, b: 2, c: 3 }::map([key, val] => x + 1)\n    | //=> { a: 2, b: 3, c: 4 }\n    ", function (f, obj) {
    return foldl(function (_ref27, acc) {
      var _ref28 = _slicedToArray(_ref27, 2),
          k = _ref28[0],
          v = _ref28[1];

      return append([k, f(v)], acc);
    }, {}, obj);
  }),
  empty: Fun("empty", [Obj, Obj(withMeta(function (x) {
    return Object.keys(x).length === 0;
  }, {
    name: 'empty'
  }))], 'Returns an empty object', function (_) {
    return {};
  }),
  append: Fun("append", [Arr(withMeta(function (x) {
    return x.length === 2 && is(OneOf([Str, Num]), x[0]);
  }, {
    name: 'KeyValuePair'
  })), Obj, Obj], 'Appends a key/value pair to the an object', function (kvp, obj) {
    var _kvp = _slicedToArray(kvp, 2),
        k = _kvp[0],
        v = _kvp[1];

    return assoc(k, v, obj);
  }),
  keys: Fun("keys", [Obj, [Str]], 'Returns a list of all the objects keys', Object.keys),
  caseOf: Fun("caseOf", [Arr, Obj, Any], "Allows for pattern matching on objects.\n\n    | Example:\n    |\n    | { a: 123, b: 'foo' }::caseOf({\n    |   [{ a: Number, b: 'foo' }]: xs => '{ a: Number, b: 'foo' }',\n    |   [{ d: Array }]: xs => '{ d: Array }',\n    |   [__]: xs => 'every other object'\n    | }) // => '{ a: Number, b: 'foo' }'\n    ", function (patterns, obj) {
    var match;

    var matchPattern = function matchPattern(matcher, value) {
      if (typeof matcher === 'function') {
        if (value !== undefined && matcher(value) === true) {
          return true;
        }
      }

      if (is(matcher, value)) {
        return true;
      }

      if (value === matcher) {
        return true;
      }

      if (matcher instanceof RegExp && is(String, value) && string.match(matcher)) {
        return true;
      }

      if (Array.isArray(matcher) && Array.isArray(value)) {
        var last = matcher[matcher.length - 1];

        if (last && last.kind === 'Spread') {
          matcher = matcher.slice(0, matcher.length - 1);
          return matcher.every(function (item, i) {
            return matchPattern(item, value[i]);
          }) && value.slice(matcher.length).every(function (v) {
            return is(last.type, v);
          });
        } else {
          return matcher.length === value.length && value.every(function (item, i) {
            return matchPattern(matcher[i], item);
          });
        }
      }

      if (is(Object, matcher) && is(Object, value)) {
        return Object.keys(matcher).every(function (key) {
          return matchPattern(matcher[key], value[key]);
        });
      }

      return false;
    };

    var _iterator8 = _createForOfIteratorHelper(patterns),
        _step8;

    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var _step8$value = _slicedToArray(_step8.value, 2),
            matcher = _step8$value[0],
            fn = _step8$value[1];

        if (matchPattern(matcher, obj)) {
          match = fn(obj);
          break;
        }

        if (matcher === __) {
          match = fn(obj);
          break;
        }
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }

    if (process.env.NODE_ENV !== 'production') {
      if (!patterns.some(function (_ref29) {
        var _ref30 = _slicedToArray(_ref29, 1),
            matcher = _ref30[0];

        return matcher === __;
      })) {
        patternError(obj, patterns, 'Wildcard matcher is required when pattern matching on objects');
      }
    }

    return match;
  })
});
extendType(Maybe, {
  clone: Fun("clone", [Maybe(Implements('clone')), Maybe(Implements('clone'))], 'Clones the wrapped value', function (m) {
    return map(clone, m);
  }),
  shallowClone: Fun("shallowClone", [Maybe(Implements('shallowClone')), Maybe(Implements('shallowClone'))], 'Clones the wrapped value', function (m) {
    return map(shallowClone, m);
  }),
  empty: Fun("empty", [Maybe, Maybe.None], 'Always returns None', function (_) {
    return Maybe.None();
  }),
  append: Fun("append", [Maybe(Any), Maybe(Implements('append')), Maybe(Implements('append'))], 'Appends the content of one maybe to the content of another', function (mb, ma) {
    return caseOf([["Some", function (a) {
      return caseOf([["Some", function (b) {
        return Maybe.Some(append(b, a));
      }], ["None", function () {
        return ma;
      }]], mb);
    }], ["None", function () {
      return mb;
    }]], ma);
  }),
  map: Fun("map", [Function, Maybe, Maybe], 'Maps a function over the value contained in the maybe', function (f, m) {
    return caseOf([["Some", function (x) {
      return Maybe.Some(f(x));
    }], ["None", function () {
      return Maybe.None();
    }]], m);
  }),
  pure: Fun("pure", [Any, Maybe, Maybe.Some], 'Returns a Some containing the passed in value', function (x, _) {
    return Maybe.Some(x);
  }),
  flatten: Fun("flatten", [Maybe(Maybe(Any)), Maybe(Any)], 'Flattens a nested maybe', function (m) {
    return caseOf([["Some", id], ["None", function () {
      return Maybe.None();
    }]], m);
  }),
  ap: Fun("ap", [Maybe(Any), Maybe(Function), Maybe(Any)], 'Applies a value wrapped in a Maybe.Some to a function wrapped in Maybe.Some', function (mb, ma) {
    return caseOf([["Some", map(__, mb)], ["None", Maybe.None]], ma);
  }),
  foldl: Fun("foldl", [Function, Any, Maybe, Any], "Transforms a Maybe by running it's value and an accumulator through a function", function (f, acc, ma) {
    return caseOf([["Some", function (x) {
      return f(x, acc);
    }], ["None", function () {
      return acc;
    }]], ma);
  }),
  foldr: Fun("foldr", [Function, Any, Maybe, Any], 'Same as foldl', function (f, acc, ma) {
    return caseOf([["Some", function (x) {
      return f(x, acc);
    }], ["None", function () {
      return acc;
    }]], ma);
  })
});
extendType(Result, {
  clone: Fun("clone", [Result(Implements('clone')), Result(Implements('clone'))], 'Clones the wrapped value', function (m) {
    return map(clone, m);
  }),
  shallowClone: Fun("shallowClone", [Result(Implements('shallowClone')), Result(Implements('shallowClone'))], 'Clones the wrapped value', function (m) {
    return map(shallowClone, m);
  }),
  empty: Fun("empty", [Result(Implements('empty')), Result(Implements('empty'))], 'Returns a new result with the empty content', function (res) {
    return caseOf([["Ok", function (val) {
      return Result.Ok(empty(val));
    }], ["Err", function (err) {
      return Result.Err(empty(err));
    }]], res);
  }),
  append: Fun("append", [Result(Implements('append')), Result(Implements('append')), Result(Implements('append'))], 'Appends the content of one result to the content of another', function (mb, ma) {
    return caseOf([["Ok", function (x) {
      return caseOf([["Ok", function (xs) {
        return Result.Ok(append(xs, x));
      }], ["Err", function () {
        return ma;
      }]], mb);
    }], ["Err", function (x) {
      return caseOf([["Ok", function () {
        return mb;
      }], ["Err", function (xs) {
        return Result.Err(append(xs, x));
      }]], mb);
    }]], ma);
  }),
  map: Fun("map", [Function, Result, Result], 'Maps a function over the value contained in a Result.Ok', function (f, m) {
    return caseOf([["Ok", function (x) {
      return Result.Ok(f(x));
    }], ["Err", Result.Err]], m);
  }),
  bimap: Fun("bimap", [Function, Function, Result, Result], 'Like map but also takes a function to map over the error case', function (err, ok, ma) {
    return caseOf([["Ok", function (x) {
      return Result.Ok(ok(x));
    }], ["Err", function (x) {
      return Result.Err(err(x));
    }]], ma);
  }),
  pure: Fun("pure", [Any, Result, Result.Ok], 'Returns a Some containing the passed in value', function (x, _) {
    return Result.Ok(x);
  }),
  flatten: Fun("flatten", [OneOf([Result(Result(Any)), Result.Err]), Result(Any)], 'Flattens a nested result', function (m) {
    return caseOf([["Ok", id], ["Err", function (err) {
      return Result.Err(err);
    }]], m);
  }),
  ap: Fun("ap", [Result(Any), OneOf([Result(Function), Result.Err]), Result(Any)], 'Applies a value wrapped in a Result.Ok to a function wrapped in Result.Ok', function (mb, ma) {
    return caseOf([["Ok", map(__, mb)], ["Err", Result.Err]], ma);
  }),
  foldl: Fun("foldl", [Function, Any, Result, Any], 'Transforms a Result by running its value and an accumulator through a function', function (f, acc, ma) {
    return caseOf([["Ok", function (x) {
      return f(x, acc);
    }], ["Err", function (_) {
      return acc;
    }]], ma);
  }),
  foldr: Fun("foldr", [Function, Any, Result, Any], 'Same as foldl', function (f, acc, ma) {
    return caseOf([["Ok", function (x) {
      return f(x, acc);
    }], ["Err", function (_) {
      return acc;
    }]], ma);
  })
});
extendType(Task, {
  clone: Fun("clone", [Task, Task], 'Returns a new task with the content cloned', function (t) {
    return map(clone, t);
  }),
  shallowClone: Fun("shallowClone", [Task, Task], 'Returns a new task with the content shallowly cloned', function (t) {
    return map(shallowClone, t);
  }),
  map: Fun("map", [Function, Task, Task], 'Maps a function over the contents of a Task', function (f, t) {
    return Task(function (fail, succeed) {
      return t.fork(fail, function (val) {
        return succeed(f(val));
      });
    });
  }),
  pure: Fun("pure", [Any, Task, Task], 'Returns a task that succeeds with the given value', function (val, _) {
    return Task.succeed(val);
  }),
  flatten: Fun("flatten", [Task, Task], 'Flattens a nested task', function (t) {
    return Task(function (fail, succeed) {
      return t.fork(fail, function (t2) {
        return t2.fork(fail, succeed);
      });
    });
  }),
  ap: Fun("ap", [Task, Task, Task], 'Applies the value of one task to the value of another', function (tb, ta) {
    return flatten(map(function (f) {
      return map(f, tb);
    }, ta));
  }),
  bimap: Fun("bimap", [Function, Function, Task, Task], 'Like map but also accepts a funtion to run over the error case', function (f, g, m) {
    return Task(function (fail, succeed) {
      m.fork(function (err) {
        return fail(f(err));
      }, function (val) {
        return succeed(g(val));
      });
    });
  })
}); // -- Core functions

var id = Fun("id", [Any, Any], "The identity function always return the argument it's called with.", function (x) {
  return x;
}); // const matchPattern = (value, matcher) => {
//   if (matcher === __ || matcher === '_') {
//     return true
//   }
//
//   if (value::is(Union) && typeof matcher === 'string') {
//     return value[UnionCase] === matcher
//   }
//
//   if (matcher::is(Array) && value::is(Array)) {
//     const last = matcher[matcher.length - 1]
//
//     if (last && last.kind === 'Spread') {
//       matcher = matcher.slice(0, matcher.length - 1)
//       return (
//         matcher.every((item, i) => matchPattern(value[i], item)) &&
//         value.slice(matcher.length).every(v => v::is(last.type))
//       )
//     } else {
//       return (
//         matcher.length === value.length &&
//         value.every((item, i) => matchPattern(item, matcher[i]))
//       )
//     }
//   }
//
//   if (matcher::is(Object) && value::is(Object)) {
//     return Object.keys(matcher).every(key => {
//       return matchPattern(value[key], matcher[key])
//     })
//   }
//
//   if (value::is(matcher)) {
//     return true
//   }
//   if (matcher::is(Function) && !matcher[KindKey] && value !== undefined) {
//     const res = matcher(value)
//     if (res === true) {
//       return true
//     }
//     if (res === false) {
//       return false
//     }
//   }
//
//   if (matcher === value) {
//     return true
//   }
//
//   return false
// }
// export const caseOf = Fun(
//   [Array, Any, Any],
//
//   `Provides a way to pattern match on arbitrary values.
//
//   | Example:
//   |
//   | const lt = Fun(
//   |   [Number, Number, Boolean],
//   |   "less than",
//   |   (a, b) => a > b
//   | )
//   |
//   | 2::caseOf({
//   |   1: num => 'one',
//   |   [lt(4)]: num => 'two or three',
//   |   _: num => 'other'
//   | }) //=> 'two or three'
//   |
//   | [1, [2, 3], { a: { b: 'foo' } }]::caseOf({
//   |   [[String, [2, 3], { a: { b: 'foo' }  }]]: arr =>
//   |     "Won't match since first element is a number",
//   |   [[Number, [2, 3], { a: { b: 'foo' } }]]: arr =>
//   |     "Will match",
//   | }) //=> "Will match"
//   `,
//
//   (pattern, value) => {
//     let returnValue
//     for (const [matcher, fn] of pattern) {
//       if (matchPattern(value, matcher)) {
//         returnValue = value::is(Union) ? fn(...value[UnionValues]) : fn(value)
//         break
//       }
//     }
//
//     if (returnValue === undefined) {
//       throw new TypeError(`
//
// Encountered non-exhaustive pattern in the following expression:
//
// ${show(value)}::caseOf({
//   ${pattern
//     .map(([pattern, func]) => `[${show(pattern)}]: (...) => { ... }`)
//     .join(',\n  ')}
// })
// `)
//     }
//
//     return returnValue
//   }
// )

exports.id = id;
var implementsExtension = Fun("implementsExtension", [[String], Any, Boolean], 'Returns true if the value implements all of the extensions', function (fns, obj) {
  var map = dispatchMap[showType(getType(obj))];
  return every(function (fn) {
    return !!map[fn];
  }, fns);
}); // -- BiFunctor Utils

exports.implementsExtension = implementsExtension;
var mapError = Fun("mapError", [Function, Implements('bimap'), Implements('bimap')], "Maps a function over the 'error' case of a bifunctor", function (fn, f) {
  return bimap(fn, id, f);
}); // -- Applicative Utils

exports.mapError = mapError;
var liftA2 = Fun("liftA2", [Function, Implements('ap'), Implements('ap'), Implements('ap')], "Lifts a regular function of two arguments into a function that can\n  operate on the values of two applicatives.\n\n  | Example:\n  |\n  | liftA2(add, [2, 3], [3, 3]) //=> [5, 5, 6, 6]\n  |\n  | liftA2(conj, Maybe.Some(3), Maybe.Some([1, 2])) //=> Maybe.Some([1, 2, 3])\n  ", function (f, a1, a2) {
  return ap(a2, map(f, a1));
});
exports.liftA2 = liftA2;
var liftA3 = Fun("liftA3", [Function, Implements('ap'), Implements('ap'), Implements('ap'), Implements('ap')], "Like liftA2 but for functions of three arguments", function (f, a1, a2, a3) {
  return ap(a3, liftA2(f, a1, a2));
});
exports.liftA3 = liftA3;
var liftA4 = Fun("liftA4", [Function, Implements('ap'), Implements('ap'), Implements('ap'), Implements('ap'), Implements('ap')], "Like liftA2 but for functions of four arguments", function (f, a1, a2, a3, a4) {
  return ap(a4, liftA3(f, a1, a2, a3));
});
exports.liftA4 = liftA4;
var liftA5 = Fun("liftA5", [Function, Implements('ap'), Implements('ap'), Implements('ap'), Implements('ap'), Implements('ap'), Implements('ap')], "Like liftA2 but for functions of five arguments", function (f, a1, a2, a3, a4, a5) {
  return ap(a5, liftA4(f, a1, a2, a3, a4));
});
exports.liftA5 = liftA5;
var liftA6 = Fun("liftA6", [Function, Implements('ap'), Implements('ap'), Implements('ap'), Implements('ap'), Implements('ap'), Implements('ap'), Implements('ap')], "Like liftA2 but for functions of six arguments", function (f, a1, a2, a3, a4, a5, a6) {
  return ap(a6, liftA5(f, a1, a2, a3, a4, a5));
});
exports.liftA6 = liftA6;
var sequenceA = Fun("sequenceA", [[Implements('ap')], Implements('ap')], "Turns a list of applicatives to an applicative with a list of values\n\n  | Example:\n  |\n  | sequenceA([Maybe.Some(2), Maybe.Some(4)]) //=> Maybe.Some([2, 4])\n  ", function (xs) {
  return caseOf([["Some", function (x) {
    return foldr(liftA2(append), pure([], x), xs);
  }], ["None", function () {
    throw new TypeError("Can't call sequenceA with an empty list");
  }]], get(0, xs));
}); // -- Monadic Utils

exports.sequenceA = sequenceA;
var flatMap = Fun("flatMap", [Function, Implements('map', 'flatten'), Implements('map', 'flatten')], "Maps each element using a mapping function and then flattens the result.\n\n   | Example:\n   |\n   |   Maybe.Some(1)::flatMap(x => Maybe.Some(x + 2)) //=> Maybe.Some(3)\n  ", function (fn, m) {
  return flatten(map(fn, m));
}); // -- Collection Utils

exports.flatMap = flatMap;
var mapKV = Fun("mapKV", [Function, Implements('foldlKV'), Implements('foldlKV')], "Same as regular map but also passes the key to the function.\n  Only works for keyed colletions", function (f, xs) {
  return foldlKV(function (k, v, acc) {
    return append(f(k, v), acc);
  }, empty(xs), xs);
});
exports.mapKV = mapKV;
var filterKV = Fun("filterKV", [Function, Implements('foldlKV'), Implements('foldlKV')], 'Filters a collection by yielding each key and value to a predicate function', function (f, xs) {
  return foldlKV(function (k, v, acc) {
    return f(k, v) ? append(v, acc) : acc;
  }, empty(xs), xs);
});
exports.filterKV = filterKV;
var filter = Fun("filter", [Function, Implements('foldl'), Implements('foldl')], 'Filters a collection by yielding each value to a predicate function', function (f, xs) {
  return foldl(function (v, acc) {
    return f(v) ? append(v, acc) : acc;
  }, empty(xs), xs);
});
exports.filter = filter;
var removeKV = Fun("removeKV", [Function, Implements('foldlKV'), Implements('foldlKV')], 'Removes items from a collection by yielding each key and value to a predicate function', function (f, xs) {
  return foldlKV(function (k, v, acc) {
    return !f(k, v) ? append(v, acc) : acc;
  }, empty(xs), xs);
});
exports.removeKV = removeKV;
var remove = Fun("remove", [Function, Implements('foldl'), Implements('foldl')], 'Removes items from a collection by yielding each value to a predicate function', function (f, xs) {
  return foldl(function (v, acc) {
    return !f(v) ? append(v, acc) : acc;
  }, empty(xs), xs);
});
exports.remove = remove;
var any = Fun("any", [Function, Implements('foldl'), Boolean], 'Returns true if at least on element in a collection satisfies a predicate', function (f, xs) {
  return foldl(function (x, acc) {
    return acc ? acc : !!f(x);
  }, false, xs);
});
exports.any = any;
var every = Fun("every", [Function, Implements('foldl'), Boolean], 'Returns true if every element in a collection satisfies the predicate.', function (f, xs) {
  return foldl(function (x, acc) {
    return !acc ? acc : !!f(x);
  }, true, xs);
});
exports.every = every;
var getOrElse = Fun("getOrElse", [OneOf([String, Number]), Any, Implements('get'), Any], "Attempts to look up a value by key in a collection,\n   returns fallback if it can't be found.\n\n   | Example:\n   |\n   | { a: 'found' }::getOrElse('a', 'not-found') //=> 'found'\n   | { a: 'found' }::getOrElse('b', 'not-found') //=> 'not-found'\n  ", function (key, fallback, xs) {
  return caseOf([["Some", id], ["None", function () {
    return fallback;
  }]], get(key, xs));
});
exports.getOrElse = getOrElse;
var getIn = Fun("getIn", [[OneOf([String, Number])], Implements('get'), Maybe(Any)], "Looks up a path in a collection and returns the result in a Maybe.\n\n   | Examples:\n   |\n   | { x: { y: 'z' } }::getIn(['x', 'y']) //=> Maybe.Some('z')\n   | { x: {} }::getIn(['x', 'y'])         //=> Maybe.None( )\n   |\n   | [ [ ['a', 'b'], ['c', 'd'] ] ]::getIn([0, 1, 0]) //=> Maybe.Some('c')\n   | []::getIn([0, 1, 0])                             //=> Maybe.None( )\n  ", function (_ref31, obj) {
  var _ref32 = _toArray(_ref31),
      key = _ref32[0],
      rest = _ref32.slice(1);

  return count(rest) === 0 ? get(key, obj) : caseOf([["Some", function (x) {
    return getIn(rest, x);
  }], ["None", function () {
    return get(key, obj);
  }]], get(key, obj));
});
exports.getIn = getIn;
var getInOrElse = Fun("getInOrElse", [[OneOf([String, Number])], Any, Implements('get'), Any], "Like getIn but returns the actual value if it exists or fallback otherwise", function (path, fallback, coll) {
  return caseOf([["Some", id], ["None", function () {
    return fallback;
  }]], getIn(path, coll));
});
exports.getInOrElse = getInOrElse;
var assocIn = Fun("assocIn", [[OneOf([String, Number])], Any, Implements('assoc', 'get'), Implements('assoc', 'get')], 'Like assoc but accepts a path instead of a single key', function (_ref33, val, obj) {
  var _ref34 = _toArray(_ref33),
      key = _ref34[0],
      rest = _ref34.slice(1);

  return count(rest) === 0 ? assoc(key, val, obj) : caseOf([["Some", function (x) {
    return assoc(key, assocIn(rest, val, x), obj);
  }], ["None", function () {
    return assoc(key, assocIn(rest, val, empty(obj)), obj);
  }]], get(key, obj));
});
exports.assocIn = assocIn;
var dissocIn = Fun("dissocIn", [[OneOf([String, Number])], Implements('assoc', 'dissoc', 'get'), Implements('assoc', 'dissoc', 'get')], 'Like dissoc but accepts a path instead of a single key', function (_ref35, obj) {
  var _ref36 = _toArray(_ref35),
      key = _ref36[0],
      rest = _ref36.slice(1);

  return count(rest) === 0 ? dissoc(key, obj) : caseOf([["Some", function (x) {
    return assoc(key, dissocIn(rest, x), obj);
  }], ["None", function () {
    return assoc(key, dissocIn(rest, empty(obj)), obj);
  }]], get(key, obj));
});
exports.dissocIn = dissocIn;
var isEmpty = Fun("isEmpty", [Implements('count'), Boolean], 'Returns true if the collection is empty', function (x) {
  return count(x) === 0;
});
exports.isEmpty = isEmpty;
var evolve = Fun("evolve", [Object, Implements('assoc', 'get'), Implements('assoc', 'get')], "Given an object and a \"receipt\" of changes it returns a\n   new copy of the original collection with the changes applied.\n   Throws an error if a key in the \"receipt\" doesn't exist in th collection\n\n   | Example:\n   |\n   | const state = { counters: { counterA: 0, counterB: 0, counterC: 0 } }\n   |\n   | state::evolve({ counters: { counterA: 4, counterB: plus(20) } })\n   |   //=> { counters: { counterA: 4, counterB: 20, counterC: 0 } }\n  ", function (transformations, object) {
  return foldl(function (_ref37, acc) {
    var _ref38 = _slicedToArray(_ref37, 2),
        key = _ref38[0],
        val = _ref38[1];

    if (val.constructor === Object && !is(Union, val)) {
      return assoc(key, evolve(val, getOrElse(key, acc, object)), acc);
    } else if (typeof val === 'function') {
      return assoc(key, val(getOrElse(key, void 0, acc)), acc);
    } else {
      return assoc(key, val, acc);
    }
  }, object, transformations);
}); // -- Function utils

exports.evolve = evolve;
var flip = Fun("flip", [Function, Any, Any, Any], 'Flips the argument order of a function that takes two arguments', function (f, a, b) {
  return f(b, a);
});
exports.flip = flip;
var comp = Fun("comp", [[Function], Function], "Performs right-to-left function composition.", function (fns) {
  return withMeta(function (x) {
    return foldr(function (f, acc) {
      return f(acc);
    }, x, fns);
  }, {
    name: map(getMeta('name'), fns).join(' . ')
  });
}); // -- Logic utils

exports.comp = comp;
var not = Fun("not", [Any, Boolean], "Returns true if it's argument is falsy", function (a) {
  return !!!a;
});
exports.not = not;
var equal = Fun("equal", [Any, Any, Boolean], 'Strict equality check', function (a, b) {
  return a === b;
});
exports.equal = equal;
var deepEqual = Fun("deepEqual", [Any, Any, Boolean], 'Performs a deep equality check', function (a, b) {
  if (is(String, a) || is(String, b)) return equal(b, a);

  if (implementsExtension(['foldlKV'], a) && implementsExtension(['get'], b)) {
    return foldlKV(function (key, val, acc) {
      if (is(Array, val) && count(val) === 2 && val[0] === key) {
        return deepEqual(val[1], getOrElse(key, false, b));
      } else {
        return deepEqual(val, getOrElse(key, false, b));
      }
    }, true, a);
  } else {
    return a === b;
  }
}); // -- Number utils

exports.deepEqual = deepEqual;
var lt = Fun("lt", [Number, Number, Boolean], 'Returns true if the last number is less than the first number', function (a, b) {
  return b < a;
});
exports.lt = lt;
var gt = Fun("gt", [Number, Number, Boolean], 'Returns true if the last number is greater than the first number', function (a, b) {
  return b > a;
});
exports.gt = gt;
var plus = Fun("plus", [Number, Number, Boolean], 'Returns the sum of two numbers', function (a, b) {
  return b + a;
});
exports.plus = plus;
var times = Fun("times", [Number, Number, Boolean], 'Returns the product of two numbers', function (a, b) {
  return b * a;
});
exports.times = times;
var div = Fun("div", [Num(comp([not, equal(0)])), Num, Num], 'Returns the remainder of two numbers', function (a, b) {
  return b / a;
}); // -- String Utils

exports.div = div;
var split = Fun("split", [OneOf([String, RegExp]), String, [String]], 'Creates an array by splitting a string by a pattern', function (pattern, str) {
  return str.split(pattern);
});
exports.split = split;
var replace = Fun("replace", [OneOf([String, RegExp]), String, String, String], 'Replaces occurrances of pattern in str with the replacement string.', function (pattern, replacement, str) {
  return str.replace(pattern, replacement);
});
exports.replace = replace;
var lowercase = Fun("lowercase", [String, String], 'Returns the source string in all lowercase.', function (str) {
  return str.toLowerCase();
});
exports.lowercase = lowercase;
var uppercase = Fun("uppercase", [String, String], 'Returns the source string in all lowercase.', function (str) {
  return str.toUpperCase();
});
exports.uppercase = uppercase;
var capitalize = Fun("capitalize", [String, String], 'It capitalizes a string', function (str) {
  return count(str) === 0 ? str : uppercase(str[0]) + lowercase(rest(str));
});
exports.capitalize = capitalize;
var contains = Fun("contains", [OneOf([String, RegExp]), String, Boolean], 'Returns true if the string contains the provided pattern', function (pattern, str) {
  return !!str.match(pattern);
});
exports.contains = contains;
