import {
  ProtocolSym,
  Null,
  Any,
  OneOf,
  Implements,
  Spread,
  getType,
  show,
  showType,
  __,
  curry,
  caseOf,
  is,
  Fun,
  Type,
  Union,
  extendType,
  Dispatch,
  Maybe,
  maybe,
  Result,
  result,
  Task,
  clone,
  shallowClone,
  empty,
  append,
  count,
  get,
  first,
  rest,
  conj,
  foldlKV,
  foldrKV,
  foldl,
  foldr,
  keys,
  vals,
  assoc,
  dissoc,
  map,
  mapError,
  bimap,
  pure,
  flatten,
  ap,
  liftA2,
  liftA3,
  liftA4,
  liftA5,
  liftA6,
  flatMap,
  comp,
  flip,
  mapKV,
  filterKV,
  filter,
  removeKV,
  remove,
  any,
  every,
  getOrElse,
  getIn,
  getInOrElse,
  assocIn,
  dissocIn,
  evolve,
  join,
  slice,
  sliceFrom,
  match,
  split,
  replace,
  lowercase,
  uppercase,
  capitalize,
  not,
  equal,
  deepEqual,
  lt,
  gt,
  plus,
  minus,
  div,
  times,
} from '../'

describe('curry', () => {
  describe('when called with to few arguments', () => {
    it('it returns a partially applied function', () => {
      const add = curry((a, b, c, d) => a + b + c + d, 4)

      expect(add(1)(2, 3)(4)).toBe(10)
    })
  })

  describe('when called without an explicit arity', () => {
    it('fallsback to Function.length', () => {
      const add = curry((a, b) => a + b)

      expect(add(1)(2)).toBe(3)
    })
  })

  describe('when called with all arguments at once', () => {
    it('returns the expected value', () => {
      const add = curry((a, b) => a + b, 2)

      expect(add(1, 2)).toBe(3)
    })
  })

  it('supports placeholders', () => {
    const toArray = curry((a, b, c) => [a, b, c], 3)

    expect(toArray(1, __, 3)(2)).toEqual([1, 2, 3])
  })

  it('supports multiple placeholders', () => {
    const toArray = curry((a, b, c, d) => [a, b, c, d], 4)

    expect(toArray(1, __, __)(2, 3)(4)).toEqual([1, 2, 3, 4])
    expect(toArray(1, __, __, 4)(2, 3)).toEqual([1, 2, 3, 4])
    expect(toArray(1, __, __, __)(2)(3)(4)).toEqual([1, 2, 3, 4])
  })

  it('supports multiple levels of placeholders', () => {
    const toArray = curry((a, b, c, d) => [a, b, c, d], 4)

    expect(toArray(1, 2, __)(3, __)(4)).toEqual([1, 2, 3, 4])
  })

  it('retains the original functions name as metadata', () => {
    const f = (a, b, c, d) => [a, b, c, d]
    const curried = curry(f, 4)

    expect(curried.___meta___.name).toEqual('f')
    expect(curried(1, 2).___meta___.name).toEqual('f(1, 2)')
    expect(curried(1, 2)(3).___meta___.name).toEqual('f(1, 2, 3)')
    expect(curried(1, __)(3).___meta___.name).toEqual('f(1, 3)')
  })

  it('can be used in a loop', () => {
    const add = curry((a, b) => a + b, 2)

    expect([1, 2, 3].map(add(2))).toEqual([3, 4, 5])
    expect([1, 2, 3].map(add(__, 2))).toEqual([3, 4, 5])
  })
})

describe('is', () => {
  describe('with Null', () => {
    const isNull = is(Null)

    it('returns true if called with value null', () => {
      expect(isNull(null)).toBe(true)
    })

    it('returns true if called with value undefined', () => {
      expect(isNull(null)).toBe(true)
    })

    it('returns false when called with other values', () => {
      expect(isNull(123)).toBe(false)
      expect(isNull('foo')).toBe(false)
      expect(isNull(/abc/)).toBe(false)
      expect(isNull([1, 2, 3])).toBe(false)
      expect(isNull({ a: 1 })).toBe(false)
    })
  })

  describe('with Any', () => {
    const isAny = is(Any)

    it('always return true', () => {
      expect(isAny(null)).toBe(true)
      expect(isAny(undefined)).toBe(true)
      expect(isAny(123)).toBe(true)
      expect(isAny('foo')).toBe(true)
      expect(isAny(/abc/)).toBe(true)
      expect(isAny([1, 2, 3])).toBe(true)
      expect(isAny({ a: 1 })).toBe(true)
    })
  })

  describe('with value type', () => {
    it('returns true when called with the same value', () => {
      expect(is({ a: 2 }, { a: 2 })).toBe(true)
      expect(is(2, 2)).toBe(true)
      expect(is('abc', 'abc')).toBe(true)
    })

    it('returns false when called with a different value', () => {
      expect(is({ a: 2 }, { a: 4 })).toBe(false)
      expect(is(2, 4)).toBe(false)
      expect(is('abc', 'def')).toBe(false)
    })
  })

  describe('with Function', () => {
    const isFn = is(Function)

    it('returns true when called with a value of type function', () => {
      expect(isFn(() => {})).toBe(true)
    })

    it('returns false when called with a value that is of another type', () => {
      expect(isFn(null)).toBe(false)
      expect(isFn(undefined)).toBe(false)
      expect(isFn(123)).toBe(false)
      expect(isFn('foo')).toBe(false)
      expect(isFn(/abc/)).toBe(false)
      expect(isFn([1, 2, 3])).toBe(false)
      expect(isFn({ a: 1 })).toBe(false)
      expect(isFn(new Map())).toBe(false)
      expect(isFn(new WeakMap())).toBe(false)
      expect(isFn(new Set())).toBe(false)
    })
  })

  describe('with String', () => {
    const isStr = is(String)

    it('returns true when called with a value of type string', () => {
      expect(isStr('abc')).toBe(true)
    })

    it('returns false when called with a value that is of another type', () => {
      expect(isStr(null)).toBe(false)
      expect(isStr(undefined)).toBe(false)
      expect(isStr(123)).toBe(false)
      expect(isStr(() => {})).toBe(false)
      expect(isStr(/abc/)).toBe(false)
      expect(isStr([1, 2, 3])).toBe(false)
      expect(isStr({ a: 1 })).toBe(false)
      expect(isStr(new Map())).toBe(false)
      expect(isStr(new WeakMap())).toBe(false)
      expect(isStr(new Set())).toBe(false)
    })
  })

  describe('with Number', () => {
    const isNum = is(Number)

    it('returns true when called with a value of type number', () => {
      expect(isNum(123)).toBe(true)
    })

    it('returns false when called with a value that is of another type', () => {
      expect(isNum(null)).toBe(false)
      expect(isNum(undefined)).toBe(false)
      expect(isNum('abc')).toBe(false)
      expect(isNum(() => {})).toBe(false)
      expect(isNum(/abc/)).toBe(false)
      expect(isNum([1, 2, 3])).toBe(false)
      expect(isNum({ a: 1 })).toBe(false)
      expect(isNum(new Map())).toBe(false)
      expect(isNum(new WeakMap())).toBe(false)
      expect(isNum(new Set())).toBe(false)
    })
  })

  describe('with RegExp', () => {
    const isRegex = is(RegExp)

    it('returns true when called with a value of type regex', () => {
      expect(isRegex(/abc/)).toBe(true)
    })

    it('returns false when called with a value that is of another type', () => {
      expect(isRegex(null)).toBe(false)
      expect(isRegex(undefined)).toBe(false)
      expect(isRegex('abc')).toBe(false)
      expect(isRegex(() => {})).toBe(false)
      expect(isRegex(123)).toBe(false)
      expect(isRegex([1, 2, 3])).toBe(false)
      expect(isRegex({ a: 1 })).toBe(false)
      expect(isRegex(new Map())).toBe(false)
      expect(isRegex(new WeakMap())).toBe(false)
      expect(isRegex(new Set())).toBe(false)
    })
  })

  describe('with Object', () => {
    const isObj = is(Object)

    it('returns true when called with a value of type object', () => {
      expect(isObj({ a: 2 })).toBe(true)
    })

    it('returns false when called with a value that is of another type', () => {
      expect(isObj(null)).toBe(false)
      expect(isObj(undefined)).toBe(false)
      expect(isObj('abc')).toBe(false)
      expect(isObj(() => {})).toBe(false)
      expect(isObj(123)).toBe(false)
      expect(isObj([1, 2, 3])).toBe(false)
      expect(isObj(/abc/)).toBe(false)
      expect(isObj(new Map())).toBe(false)
      expect(isObj(new WeakMap())).toBe(false)
      expect(isObj(new Set())).toBe(false)
    })
  })

  describe('with Array', () => {
    const isArr = is(Array)

    it('returns true when called with a value of type array', () => {
      expect(isArr([1, 2, 3])).toBe(true)
    })

    it('returns false when called with a value that is of another type', () => {
      expect(isArr(null)).toBe(false)
      expect(isArr(undefined)).toBe(false)
      expect(isArr('abc')).toBe(false)
      expect(isArr(() => {})).toBe(false)
      expect(isArr(123)).toBe(false)
      expect(isArr({ a: 2 })).toBe(false)
      expect(isArr(/abc/)).toBe(false)
      expect(isArr(new Map())).toBe(false)
      expect(isArr(new WeakMap())).toBe(false)
      expect(isArr(new Set())).toBe(false)
    })
  })

  describe('with Map', () => {
    const isMap = is(Map)

    it('returns true when called with a value of type map', () => {
      expect(isMap(new Map())).toBe(true)
    })

    it('returns false when called with a value that is of another type', () => {
      expect(isMap(null)).toBe(false)
      expect(isMap(undefined)).toBe(false)
      expect(isMap('abc')).toBe(false)
      expect(isMap(() => {})).toBe(false)
      expect(isMap(123)).toBe(false)
      expect(isMap({ a: 2 })).toBe(false)
      expect(isMap(/abc/)).toBe(false)
      expect(isMap(new WeakMap())).toBe(false)
      expect(isMap(new Set())).toBe(false)
    })
  })

  describe('with WeakMap', () => {
    const isWeakMap = is(WeakMap)

    it('returns true when called with a value of type map', () => {
      expect(isWeakMap(new WeakMap())).toBe(true)
    })

    it('returns false when called with a value that is of another type', () => {
      expect(isWeakMap(null)).toBe(false)
      expect(isWeakMap(undefined)).toBe(false)
      expect(isWeakMap('abc')).toBe(false)
      expect(isWeakMap(() => {})).toBe(false)
      expect(isWeakMap(123)).toBe(false)
      expect(isWeakMap({ a: 2 })).toBe(false)
      expect(isWeakMap(/abc/)).toBe(false)
      expect(isWeakMap(new Map())).toBe(false)
      expect(isWeakMap(new Set())).toBe(false)
    })
  })

  describe('with Set', () => {
    const isSet = is(Set)

    it('returns true when called with a value of type map', () => {
      expect(isSet(new Set())).toBe(true)
    })

    it('returns false when called with a value that is of another type', () => {
      expect(isSet(null)).toBe(false)
      expect(isSet(undefined)).toBe(false)
      expect(isSet('abc')).toBe(false)
      expect(isSet(() => {})).toBe(false)
      expect(isSet(123)).toBe(false)
      expect(isSet({ a: 2 })).toBe(false)
      expect(isSet(/abc/)).toBe(false)
      expect(isSet(new Map())).toBe(false)
      expect(isSet(new WeakMap())).toBe(false)
    })
  })

  describe('with OneOf', () => {
    it('returns true when called with a value of one of the types', () => {
      expect(is(OneOf([Number, String]), 123)).toBe(true)
      expect(is(OneOf([Number, String]), 'abc')).toBe(true)
    })

    it('returns false when called with a value that is of another type', () => {
      expect(is(OneOf([Number, String]), null)).toBe(false)
      expect(is(OneOf([Number, String]), undefined)).toBe(false)
      expect(is(OneOf([Number, String]), () => {})).toBe(false)
      expect(is(OneOf([Number, String]), { a: 2 })).toBe(false)
      expect(is(OneOf([Number, String]), /abc/)).toBe(false)
      expect(is(OneOf([Number, String]), new Map())).toBe(false)
      expect(is(OneOf([Number, String]), new WeakMap())).toBe(false)
    })
  })

  describe('with Typed Array', () => {
    it('returns true when called with an array where every element is of the same type', () => {
      expect(is([String], ['foo', 'bar', 'baz'])).toBe(true)
    })

    it('returns false when called with an array with mixed types', () => {
      expect(is([String], ['foo', 234, /abc/])).toBe(false)
    })

    it('returns false when called with an array of other types', () => {
      expect(is([String], [null, null, null])).toBe(false)
      expect(is([String], [undefined, undefined, undefined])).toBe(false)
      expect(is([String], [() => {}, () => {}, () => {}])).toBe(false)
      expect(is([String], [{ a: 2 }, { a: 2 }, { a: 2 }])).toBe(false)
      expect(is([String], [/abc/, /abc/, /abc/])).toBe(false)
      expect(is([String], [new Map(), new Map(), new Map()])).toBe(false)
      expect(is([String], [new WeakMap(), new WeakMap(), new WeakMap()])).toBe(
        false
      )
    })

    it('returns false when called with other types', () => {
      expect(is([String], null)).toBe(false)
      expect(is([String], undefined)).toBe(false)
      expect(is([String], () => {})).toBe(false)
      expect(is([String], { a: 2 })).toBe(false)
      expect(is([String], /abc/)).toBe(false)
      expect(is([String], new Map())).toBe(false)
      expect(is([String], new WeakMap())).toBe(false)
    })
  })

  describe('with Typed Object', () => {
    it('returns true when called with an object with the same keys and value types', () => {
      expect(is({ a: Number, b: String }, { a: 123, b: 'abc' })).toBe(true)
    })

    it('returns true when called with an object with the too many keys if the required keys are of the correct type', () => {
      expect(
        is({ a: Number, b: String }, { a: 123, b: 'abc', d: /whatever/ })
      ).toBe(true)
    })

    it('returns false when called with an object with the same keys but different value types', () => {
      expect(is({ a: Number, b: String }, { a: 'abc', b: 123 })).toBe(false)
    })

    it('returns false when called with an object with the too many keys if the required keys are of the wrong type', () => {
      expect(
        is({ a: Number, b: String }, { a: 'abc', b: 123, d: /whatever/ })
      ).toBe(false)
    })

    it('returns false when called with an object with the to few keys', () => {
      expect(is({ a: Number, b: String }, { a: 'abc' })).toBe(false)
    })

    it('returns false when called with other types', () => {
      expect(is({ a: Number, b: String }, null)).toBe(false)
      expect(is({ a: Number, b: String }, undefined)).toBe(false)
      expect(is({ a: Number, b: String }, () => {})).toBe(false)
      expect(is({ a: Number, b: String }, { a: 2 })).toBe(false)
      expect(is({ a: Number, b: String }, /abc/)).toBe(false)
      expect(is({ a: Number, b: String }, new Map())).toBe(false)
      expect(is({ a: Number, b: String }, new WeakMap())).toBe(false)
    })
  })

  describe('with Custom Type', () => {
    const Animal = Type({ kind: String })
    const Owner = Type({ kind: String })

    it('returns true when called with the correct type', () => {
      expect(Animal('Cat')::is(Animal)).toBe(true)
    })

    it('returns false otherwise', () => {
      expect(is(Animal('Cat'), null)).toBe(false)
      expect(is(Animal('Cat'), undefined)).toBe(false)
      expect(is(Animal('Cat'), () => {})).toBe(false)
      expect(is(Animal('Cat'), { a: 2 })).toBe(false)
      expect(is(Animal('Cat'), /abc/)).toBe(false)
      expect(is(Animal('Cat'), new Map())).toBe(false)
      expect(is(Animal('Cat'), new WeakMap())).toBe(false)
      expect(is(Animal('Cat'), Owner('Human'))).toBe(false)
    })
  })

  describe('with Union Type', () => {
    const Animal = Union({ Cat: [], Dog: [] })
    const Owner = Union({ Human: [], Clown: [] })

    it('returns true when called with the correct type', () => {
      expect(Animal.Cat()::is(Animal)).toBe(true)
      expect(Animal.Cat()::is(Animal.Cat)).toBe(true)

      expect(Animal.Dog()::is(Animal)).toBe(true)
      expect(Animal.Dog()::is(Animal.Dog)).toBe(true)

      expect(Animal.Dog()::is(Union)).toBe(true)
    })

    it('returns false otherwise', () => {
      expect(is(Animal.Cat(), null)).toBe(false)
      expect(is(Animal.Cat(), undefined)).toBe(false)
      expect(is(Animal.Cat(), () => {})).toBe(false)
      expect(is(Animal.Cat(), { a: 2 })).toBe(false)
      expect(is(Animal.Cat(), /abc/)).toBe(false)
      expect(is(Animal.Cat(), new Map())).toBe(false)
      expect(is(Animal.Cat(), new WeakMap())).toBe(false)
      expect(is(Animal.Cat(), Owner)).toBe(false)
      expect(is(Animal.Cat(), Owner)).toBe(false)
    })
  })
})

describe('Fun', () => {
  test('when called without a type declaration', () => {
    const myFun = expect(() =>
      Fun('myFun', 'My function', () => {})
    ).toThrowError(
      new TypeError(`
Encountered an error during the folowing function definition:

const myFun = Fun(
  > ,
  ...
)

    - Expected a list of type declarations
`)
    )
  })

  test('when called without a docstring', () => {
    const myFun = expect(() => Fun('myFun', [], () => {})).toThrowError(
      new TypeError(`
Encountered an error during the folowing function definition:

const myFun = Fun(
  [  ],
  > ,
  (...) => { ... }
)

    - Expected a documentation string
`)
    )
  })

  test('when called without a function', () => {
    const myFun = expect(() => Fun('myFun', [], 'my fun')).toThrowError(
      new TypeError(`
Encountered an error during the folowing function definition:

const myFun = Fun(
  [  ],
  "my fun",
  >
)

    - Expected a function expression
`)
    )
  })

  test('when called with to few types', () => {
    const myFun = expect(() =>
      Fun('myFun', [String, String], 'my fun', (a, b) => a + b)
    ).toThrowError(
      new TypeError(`
Encountered an error during the folowing function definition:

const myFun = Fun(
  [ String, String, ??? ],
  "my fun",
  (...) => { ... }
)

    - Missing return type
`)
    )
  })

  describe('when invoking a Fun instance', () => {
    test('with incorrect types', () => {
      const myFun = Fun([String, Number, String], 'my fun', (a, b) => a + b)

      expect(() => myFun(2, 2)).toThrowError(
        new TypeError(`

Encountered unexpected types in the following function call:

myFun(2, 2)
      ^
    - Expected 2 to be of type String

`)
      )
    })

    test('with too many values', () => {
      const myFun = Fun([String, Number, String], 'my fun', (a, b) => a + b)

      expect(() => myFun('abc', 2, 2)).toThrowError(
        new TypeError(`

Encountered unexpected types in the following function call:

myFun("abc", 2, 2)
                ^
    - Unexpected argument 2 has no matching type declaration

`)
      )
    })

    test('with incorrect types and too many values', () => {
      const myFun = Fun([String, Number, String], 'my fun', (a, b) => a + b)

      expect(() => myFun(1, 2, 3)).toThrowError(
        new TypeError(`

Encountered unexpected types in the following function call:

myFun(1, 2, 3)
      ^     ^
    - Expected 1 to be of type String
    - Unexpected argument 3 has no matching type declaration

`)
      )
    })

    test('incorrect return value', () => {
      const myFun = Fun([String, Number, String], 'my fun', (a, b) => 123)

      expect(() => myFun('abc', 2)).toThrowError(
        new TypeError(`

Encountered unexpected return type from function myFun in the following call:

myFun("abc", 2)

    - Expected the returned value 123 to be of type String

`)
      )
    })

    test('correct types and return type', () => {
      const myFun = Fun([String, Number, String], 'my fun', (a, b) => a + b)

      expect(myFun('abc', 123)).toBe('abc123')
    })

    test('Fun functions are curried', () => {
      const myFun = Fun([String, Number, String], 'my fun', (a, b) => a + b)

      expect(myFun('abc')(123)).toBe('abc123')
    })

    test('Fun functions have a name', () => {
      const myFun = Fun([String, Number, String], 'my fun', (a, b) => a + b)

      expect(myFun.___meta___.name).toBe('myFun')
    })

    test('Fun functions has documentation', () => {
      const myFun = Fun([String, Number, String], 'my fun', (a, b) => a + b)

      expect(myFun.___meta___.docs.declaration).toBe(
        'String -> Number -> String'
      )

      expect(myFun.___meta___.docs.docstr).toBe('my fun')
    })
  })
})

describe('Type', () => {
  it('creates a type constructor based on a type signature', () => {
    const Book = { name: String, tagline: String }
    const Author = Type({ name: String, books: [Book] })
    const anne = Author('Anne Fausto-Sterling', [
      {
        name: 'Myths of Gender',
        tagline: 'Biological Theories About Women And Men',
      },
      {
        name: 'Sexing the Body',
        tagline: 'Gender Politics and the Construction of Sexuality',
      },
      { name: 'Sex/Gender', tagline: 'Biology in a Social World' },
    ])

    expect(anne.name).toBe('Anne Fausto-Sterling')
    expect(anne.books[0].name).toBe('Myths of Gender')
    expect(anne.books[0].tagline).toBe(
      'Biological Theories About Women And Men'
    )
    expect(anne.books[1].name).toBe('Sexing the Body')
    expect(anne.books[1].tagline).toBe(
      'Gender Politics and the Construction of Sexuality'
    )
    expect(anne.books[2].name).toBe('Sex/Gender')
    expect(anne.books[2].tagline).toBe('Biology in a Social World')
  })

  it('throws a type error if invoked with incorrect types', () => {
    const Book = { name: String, tagline: String }
    const Author = Type({ name: String, books: [Book] })

    expect(() => Author(1234, ['abc', 'def'])).toThrowError(
      new TypeError(`Invalid types passed into the Author({ name: String, books: [ { name: String, tagline: String } ] }) constructor:
  * Field: name - expected value of type String but got a value of type Number (1234)
  * Field: books - expected value of type [ { name: String, tagline: String } ] but got a value of type [ String ] ([ "abc", "def" ])
`)
    )
  })

  it('can be serialized and de-serialized', () => {
    const Person = Type({ name: String, age: Number })
    const person = Person('Person McPerson', 30)

    expect(JSON.parse(JSON.stringify(person))::is(Person)).toBe(true)
  })

  it('can be extended with polymorphic dispatchers', () => {
    const Person = Type({ name: String, age: Number })

    extendType(Person, {
      map: Fun(
        [Function, Person, Person],
        'Maps a function over a persons name',
        (f, self) => ({ ...self, name: f(self.name) })
      ),
    })

    const map = Dispatch('map', { arity: 2 })

    const person = Person('Person McPerson', 30)

    expect(person::map(x => x + '!!')::show()).toBe(
      'Person("Person McPerson!!", 30)'
    )
  })

  it('retains polymorphic dispatchers after being serialized and then deserialization', () => {
    const Person = Type({ name: String, age: Number })

    extendType(Person, {
      map: Fun(
        [Function, Person, Person],
        'Maps a function over a persons name',
        (f, self) => ({ ...self, name: f(self.name) })
      ),
    })

    const map = Dispatch('map', { arity: 2 })
    const person = Person('Person McPerson', 30)

    expect(
      JSON.parse(JSON.stringify(person))
        ::map(x => x + '!!')
        ::show()
    ).toBe('Person("Person McPerson!!", 30)')
  })
})

describe('UnionType', () => {
  it('creates multiple namespaced type constructors based on a type signature', () => {
    const Status = Union({
      Loading: [],
      Done: [Number, [String]],
      Error: [Number, String],
    })

    expect(Status.Loading()::show()).toBe('Status.Loading()')
    expect(Status.Done(200, ['Item 1', 'Item 2'])::show()).toBe(
      'Status.Done(200, [ "Item 1", "Item 2" ])'
    )
    expect(Status.Error(500, 'Something went wrong!')::show()).toBe(
      'Status.Error(500, "Something went wrong!")'
    )
  })

  it('throws a type error if invoked with incorrect types', () => {
    const Status = Union({
      Loading: [],
      Done: [Number, [String]],
      Error: [Number, String],
    })

    expect(() => Status.Done('1234', [123, 456])).toThrowError(
      new TypeError(
        `Type mismatch: Type Status.Done(Number, [ String ]) was invoked with incompatible types: Status.Done("1234", [ 123, 456 ])`
      )
    )
    expect(() => Status.Error('1234', [123, 456])).toThrowError(
      new TypeError(
        `Type mismatch: Type Status.Error(Number, String) was invoked with incompatible types: Status.Error("1234", [ 123, 456 ])`
      )
    )
  })

  it('can be serialized and de-serialized', () => {
    const Status = Union({
      Loading: [],
      Done: [Number, [String]],
      Error: [Number, String],
    })

    expect(
      JSON.parse(JSON.stringify(Status.Done(200, ['123'])))::is(
        Status.Done(200, ['123'])
      )
    ).toBe(true)
  })

  it('can be extended with polymorphic dispatchers', () => {
    const Optional = Union({
      Some: [Any],
      None: [],
    })

    extendType(Optional, {
      map: Fun([Function, Optional, Optional], '...', (f, self) =>
        self::caseOf({
          [Optional.Some]: x => Optional.Some(f(x)),
          [Optional.None]: () => Optional.None(),
        })
      ),
    })

    const map = Dispatch('map', { arity: 2 })

    const optional = Optional.Some('optional value')

    expect(optional::map(x => x + '!!!')::show()).toBe(
      'Optional.Some("optional value!!!")'
    )
  })

  it('retains polymorphic dispatchers after being serialized and then deserialization', () => {
    const Optional = Union({
      Some: [Any],
      None: [],
    })

    extendType(Optional, {
      map: Fun([Function, Optional, Optional], '...', (f, self) =>
        self::caseOf({
          [Optional.Some]: x => Optional.Some(f(x)),
          [Optional.None]: () => Optional.None(),
        })
      ),
    })

    const map = Dispatch('map', { arity: 2 })

    const optional = Optional.Some('optional value')

    expect(
      JSON.parse(JSON.stringify(optional))
        ::map(x => x + '!!!')
        ::show()
    ).toBe('Optional.Some("optional value!!!")')
  })
})

describe('getType', () => {
  it('returns the type of null', () => {
    expect(getType(null)).toBe(Null)
  })

  it('returns the type of undefined', () => {
    expect(getType(undefined)).toBe(Null)
  })

  it('returns the type of strings', () => {
    expect(getType('foo')).toBe(String)
  })

  it('returns the type of numbers', () => {
    expect(getType(123)).toBe(Number)
  })

  it('returns the type of arrays', () => {
    expect(getType([1, 2, 3])).toBe(Array)
  })

  it('returns the type of objects', () => {
    expect(getType({ a: 1, b: 2 })).toBe(Object)
  })

  it('returns the type of regular expressions', () => {
    expect(getType(/abc/)).toBe(RegExp)
  })

  it('returns the type of maps', () => {
    expect(getType(new Map())).toBe(Map)
  })

  it('returns the type of weak maps', () => {
    expect(getType(new WeakMap())).toBe(WeakMap)
  })

  it('returns the type of sets', () => {
    expect(getType(new Set())).toBe(Set)
  })

  it('returns the type of weak sets', () => {
    expect(getType(new WeakSet())).toBe(WeakSet)
  })

  it('returns the type of functions', () => {
    expect(getType(() => {})).toBe(Function)
  })

  it('returns the type of custom types', () => {
    const Person = Type({ name: String, age: Number })
    expect(getType(Person('Foo Bar', 30))).toBe(Person)
  })

  it('returns the type of union types', () => {
    const Optional = Union({ Some: [Any], None: [] })
    expect(getType(Optional.Some('some value'))).toBe(Optional)
  })
})

describe('showType', () => {
  it('returns a string representation of null', () => {
    expect(showType(null)).toBe('Null')
  })

  it('returns a string representation of undefined', () => {
    expect(showType(undefined)).toBe('Null')
  })

  it('returns a string representation of the String type', () => {
    expect(showType(String)).toBe('String')
  })

  it('returns a string representation of the Number type', () => {
    expect(showType(Number)).toBe('Number')
  })

  it('returns a string representation of the Object type', () => {
    expect(showType(Object)).toBe('Object')
  })

  it('returns a string representation of the Array type', () => {
    expect(showType(Array)).toBe('Array')
  })

  it('returns a string representation of the Function type', () => {
    expect(showType(Function)).toBe('Function')
  })

  it('returns a string representation of the Map type', () => {
    expect(showType(Map)).toBe('Map')
  })

  it('returns a string representation of the WeakMap type', () => {
    expect(showType(WeakMap)).toBe('WeakMap')
  })

  it('returns a string representation of the Set type', () => {
    expect(showType(Set)).toBe('Set')
  })

  it('returns a string representation of the WeakSet type', () => {
    expect(showType(WeakSet)).toBe('WeakSet')
  })

  it('returns a string representation of the custom types', () => {
    const Person = Type({ name: String, age: Number })
    expect(showType(Person)).toBe('Person')
  })

  it('returns a string representation of the union types', () => {
    const Optional = Union({ Some: [Any], None: [] })
    expect(showType(Optional)).toBe('Optional')
    expect(showType(Optional.Some)).toBe('Optional.Some')
    expect(showType(Optional.None)).toBe('Optional.None')
  })
})

describe('show', () => {
  it('returns a string representation of numbers', () => {
    expect(show(123)).toBe('123')
  })

  it('returns a string representation of strings', () => {
    expect(show('123')).toBe('"123"')
  })

  it('returns a string representation of regular expressions', () => {
    expect(show(/abc/)).toBe('/abc/')
  })

  it('returns a string representation of arrays', () => {
    expect(show([1, 2, 3])).toBe('[ 1, 2, 3 ]')
  })

  it('returns a string representation of arrays with complex values', () => {
    expect(show([{ a: 1 }, [2, [3]]])).toBe('[ { a: 1 }, [ 2, [ 3 ] ] ]')
  })

  it('returns a string representation of objects', () => {
    expect(show({ a: 1, b: 2 })).toBe('{ a: 1, b: 2 }')
  })

  it('returns a string representation of objects with complex values', () => {
    expect(show({ a: [{ b: 1 }], b: { c: [2] } })).toBe(
      '{ a: [ { b: 1 } ], b: { c: [ 2 ] } }'
    )
  })

  it('returns a string representation of Maps', () => {
    const m = new Map()
    m.set([1], { a: 1 })
    expect(show(m)).toBe('Map { [ 1 ]: { a: 1 } }')
  })

  it('returns a string representation of WeakMaps', () => {
    const m = new WeakMap()
    m.set([1], { a: 1 })
    expect(show(m)).toBe('WeakMap {}')
  })

  it('returns a string representation of Sets', () => {
    const m = new Set()
    m.add('abc')
    m.add(123)
    expect(show(m)).toBe('Set { "abc", 123 }')
  })

  it('returns a string representation of WeakSets', () => {
    const m = new WeakSet()
    m.add([1, 2, 3])
    expect(show(m)).toBe('WeakSet {}')
  })

  it('returns a string representation of custom types', () => {
    const Author = Type({ name: String, books: [String] })

    const rebecca = Author('Rebecca M. Jordan-Young', [
      'Testosterone - An Unauthorized Biography',
      'Brainstorm - The Flaws in the Science of Sex Differences',
    ])

    expect(show(rebecca)).toBe(
      'Author("Rebecca M. Jordan-Young", [ "Testosterone - An Unauthorized Biography", "Brainstorm - The Flaws in the Science of Sex Differences" ])'
    )
  })

  it('returns a string representation of union types', () => {
    const Status = Union({ Loading: [], Done: [String] })

    expect(show(Status.Loading())).toBe('Status.Loading()')
    expect(show(Status.Done('All is well!'))).toBe(
      'Status.Done("All is well!")'
    )
  })
})

describe('Maybe', () => {
  it('defines a Some type', () => {
    expect(Maybe.Some('abc')::show()).toBe('Maybe.Some("abc")')
    expect(Maybe.Some(123)::show()).toBe('Maybe.Some(123)')
  })

  it('defines a None type', () => {
    expect(Maybe.None()::show()).toBe('Maybe.None()')
    expect(Maybe.None()::show()).toBe('Maybe.None()')
  })

  describe('.get', () => {
    it('returns the wrapped value when called with a Some', () => {
      expect(Maybe.get('no value :(', Maybe.Some('abc'))).toBe('abc')
    })

    it('returns the fallback value when called with a None', () => {
      expect(Maybe.get('no value :(', Maybe.None())).toBe('no value :(')
    })
  })

  describe('maybe', () => {
    it('returns the value wrapped in a Some if it is non-null', () => {
      expect(maybe(123)::show()).toBe('Maybe.Some(123)')
      expect(maybe('a')::show()).toBe('Maybe.Some("a")')
    })

    it('returns a Maybe.None if the value is null', () => {
      expect(maybe(null)::show()).toBe('Maybe.None()')
    })

    it('returns a Maybe.None if the value is undefined', () => {
      expect(maybe(undefined)::show()).toBe('Maybe.None()')
    })
  })

  describe('clone', () => {
    it('returns clones the value wrapped by the maybe', () => {
      const original = Maybe.Some([1, 2, 3])
      const cloned = clone(original)

      const origArr = original::caseOf({
        [Maybe.Some]: x => x,
        [Maybe.None]: () => [],
      })
      const clonedArr = cloned::caseOf({
        [Maybe.Some]: x => x,
        [Maybe.None]: () => [],
      })

      expect(clonedArr).not.toBe(origArr)
      expect(clonedArr).toEqual(origArr)
    })
  })

  describe('shallowClone', () => {
    it('returns clones the value wrapped by the maybe', () => {
      const original = Maybe.Some([[1], [2], [3]])
      const cloned = shallowClone(original)

      const origArr = original::caseOf({
        [Maybe.Some]: x => x,
        [Maybe.None]: () => [],
      })
      const clonedArr = cloned::caseOf({
        [Maybe.Some]: x => x,
        [Maybe.None]: () => [],
      })

      expect(clonedArr).not.toBe(origArr)
      expect(clonedArr).toEqual(origArr)

      expect(clonedArr[0]).toBe(origArr[0])
    })
  })

  describe('map', () => {
    it('maps a function over the value inside Some', () => {
      expect(Maybe.Some(2)::map(x => x + 1)).toEqual(Maybe.Some(3))
    })

    it('does nothing if given a None', () => {
      expect(Maybe.None()::map(x => x + 1)).toEqual(Maybe.None())
    })
  })

  describe('empty', () => {
    it('returns None', () => {
      expect(Maybe.Some(2)::empty()).toEqual(Maybe.None())
      expect(Maybe.None()::empty()).toEqual(Maybe.None())
    })
  })

  describe('append', () => {
    describe('when called with None and Some', () => {
      it('returns the Some unchanged', () => {
        expect(Maybe.None()::append(Maybe.Some('foo'))).toEqual(
          Maybe.Some('foo')
        )
      })
    })

    describe('when called with Some and None', () => {
      it('returns the Some unchanged', () => {
        expect(Maybe.Some('foo')::append(Maybe.None())).toEqual(
          Maybe.Some('foo')
        )
      })

      it('throws a type error if the Some does not contain an appendable value', () => {
        expect(() => Maybe.Some(1)::append(Maybe.None())).toThrow(TypeError)
      })
    })

    describe('when called with Some and Some', () => {
      it('it appends the value of the first Some to the value of the second', () => {
        expect(Maybe.Some('foo')::append(Maybe.Some('!'))).toEqual(
          Maybe.Some('foo!')
        )
      })

      it('throws a type error if the second Some does not contain an appendable value', () => {
        expect(() => Maybe.Some(1)::append(Maybe.Some(1))).toThrow(TypeError)
      })
    })
  })

  describe('pure', () => {
    it('takes any non-null value and wrapps it in a Some', () => {
      expect(pure(2, Maybe)).toEqual(Maybe.Some(2))
    })
  })

  describe('flatten', () => {
    it('flattens a nested maybe one level', () => {
      expect(Maybe.Some(Maybe.Some(2))::flatten()).toEqual(Maybe.Some(2))
    })

    it('does nothing when given a None', () => {
      expect(Maybe.None()::flatten()).toEqual(Maybe.None())
    })

    it('throws if given a non nested maybe', () => {
      expect(() => Maybe.Some(2)::flatten()).toThrow(TypeError)
    })
  })

  describe('ap', () => {
    it('applies a value wrapped in a Maybe.Some to a function wrapped in a Maybe.Some', () => {
      const add = curry((a, b) => a + b)
      expect(Maybe.Some(add(2))::ap(Maybe.Some(4))).toEqual(Maybe.Some(6))
    })

    it('Does nothing for Maybe.None', () => {
      const add = curry((a, b) => a + b)
      expect(Maybe.None()::ap(Maybe.Some(4))).toEqual(Maybe.None())
      expect(Maybe.Some(add(2))::ap(Maybe.None())).toEqual(Maybe.None())
      expect(Maybe.None()::ap(Maybe.None())).toEqual(Maybe.None())
    })
  })

  describe('foldl', () => {
    describe('with Some', () => {
      it('transforms the maybe into a value', () => {
        expect(Maybe.Some(2)::foldl(append, [])).toEqual([2])
      })
    })

    describe('with None', () => {
      it('returns the accumulator', () => {
        expect(Maybe.None()::foldl(append, [])).toEqual([])
      })
    })
  })
})

describe('Result', () => {
  it('defines an Ok type', () => {
    expect(Result.Ok('abc')::show()).toBe('Result.Ok("abc")')
    expect(Result.Ok(123)::show()).toBe('Result.Ok(123)')
  })

  it('defines an Err type', () => {
    expect(Result.Err('meh')::show()).toBe('Result.Err("meh")')
    expect(Result.Err(500)::show()).toBe('Result.Err(500)')
  })

  it('can be pattern matched', () => {
    expect(
      Result.Ok(200)::caseOf({
        [Result.Ok]: x => `Ok: ${x}`,
        [Result.Err]: err => `Err: ${err}`,
      })
    ).toBe('Ok: 200')

    expect(
      Result.Err(500)::caseOf({
        [Result.Ok]: x => `Ok: ${x}`,
        [Result.Err]: err => `Err: ${err}`,
      })
    ).toBe('Err: 500')
  })

  describe('.get', () => {
    describe('when called with Ok', () => {
      it('returns the value wrapped inside', () => {
        expect(Result.get(Result.Ok('abc'))).toBe('abc')
      })
    })

    describe('when called with Err', () => {
      it('returns the fallback value when called with a None', () => {
        expect(Result.get(Result.Ok('abc'))).toBe('abc')
      })
    })
  })

  describe('result', () => {
    it('returns the value wrapped in Result.Ok if it is non-null', () => {
      expect(result(123, 'error')::show()).toBe('Result.Ok(123)')
      expect(result('abc', 'error')::show()).toBe('Result.Ok("abc")')
    })

    it('returns a Result.Error if the value is null', () => {
      expect(result(null, 'error')::show()).toBe('Result.Err("error")')
    })

    it('returns a Result.Error if the value is null', () => {
      expect(result(undefined, 'error')::show()).toBe('Result.Err("error")')
    })
  })

  describe('clone', () => {
    it('returns clones the value wrapped by the result', () => {
      const original = Result.Ok([1, 2, 3])
      const cloned = clone(original)

      const origArr = original::caseOf({
        [Result.Ok]: x => x,
        [Result.Err]: _ => [],
      })
      const clonedArr = cloned::caseOf({
        [Result.Ok]: x => x,
        [Result.Err]: _ => [],
      })

      expect(clonedArr).not.toBe(origArr)
      expect(clonedArr).toEqual(origArr)
    })
  })

  describe('shallowClone', () => {
    it('returns clones the value wrapped by the maybe', () => {
      const original = Result.Ok([[1], [2], [3]])
      const cloned = shallowClone(original)

      const origArr = original::caseOf({
        [Result.Ok]: x => x,
        [Result.Err]: _ => [],
      })
      const clonedArr = cloned::caseOf({
        [Result.Ok]: x => x,
        [Result.Err]: _ => [],
      })

      expect(clonedArr).not.toBe(origArr)
      expect(clonedArr).toEqual(origArr)

      expect(clonedArr[0]).toBe(origArr[0])
    })
  })

  describe('map', () => {
    it('maps a function over the value inside Ok', () => {
      expect(Result.Ok(2)::map(x => x + 1)).toEqual(Result.Ok(3))
    })

    it('does nothing if given a Err', () => {
      expect(Result.Err('error')::map(x => x + 1)).toEqual(Result.Err('error'))
    })
  })

  describe('bimap', () => {
    it('maps a function over Result.Ok', () => {
      expect(
        Result.Ok('ok')::bimap(
          x => `${x} :(`,
          x => `${x} :)`
        )
      ).toEqual(Result.Ok('ok :)'))
    })

    it('maps a function over Result.Err', () => {
      expect(
        Result.Err('err')::bimap(
          x => `${x} :(`,
          x => `${x} :)`
        )
      ).toEqual(Result.Err('err :('))
    })
  })

  describe('empty', () => {
    describe('when called with Result.Ok', () => {
      it('returns a new Ok with the result of calling empty on its content', () => {
        expect(Result.Ok('foo')::empty()).toEqual(Result.Ok(''))
      })
    })

    describe('when called with Result.Err', () => {
      it('returns a new Err with the result of calling empty on its content', () => {
        expect(Result.Err('foo')::empty()).toEqual(Result.Err(''))
      })
    })
  })

  describe('append', () => {
    describe('when called with Err and Ok', () => {
      it('returns the Ok', () => {
        expect(Result.Err('err')::append(Result.Ok('ok'))).toEqual(
          Result.Ok('ok')
        )
      })
    })

    describe('when called with Ok and Err', () => {
      it('returns the Ok', () => {
        expect(Result.Ok('ok')::append(Result.Err('err'))).toEqual(
          Result.Ok('ok')
        )
      })
    })

    describe('when called with Ok and Ok', () => {
      it('returns a new Ok by appending the content of the first to the second', () => {
        expect(Result.Ok('ok')::append(Result.Ok('!'))).toEqual(
          Result.Ok('ok!')
        )
      })
    })

    describe('when called with Err and Err', () => {
      it('returns a new Err by appending the content of the first to the second', () => {
        expect(Result.Err('err')::append(Result.Err('!'))).toEqual(
          Result.Err('err!')
        )
      })
    })
  })

  describe('pure', () => {
    it('takes any non-null value and wraps it in a Result.Ok', () => {
      expect(pure(2, Result)).toEqual(Result.Ok(2))
    })
  })

  describe('flatten', () => {
    it('flattens a nested Result.Ok one level', () => {
      expect(Result.Ok(Result.Ok(2))::flatten()).toEqual(Result.Ok(2))
    })

    it('does nothing when given a Result.Err', () => {
      expect(Result.Err('foo')::flatten()).toEqual(Result.Err('foo'))
    })

    it('throws if given a non nested Result', () => {
      expect(() => Result.Ok(2)::flatten()).toThrow(TypeError)
    })
  })

  describe('ap', () => {
    it('applies a value wrapped in a Result.Ok to a function wrapped in a Result.Ok', () => {
      const add = curry((a, b) => a + b)
      expect(Result.Ok(add(2))::ap(Result.Ok(4))).toEqual(Result.Ok(6))
    })

    it('Does nothing for Result.Err', () => {
      const add = curry((a, b) => a + b)
      expect(Result.Err('err')::ap(Result.Ok(4))).toEqual(Result.Err('err'))
      expect(Result.Ok(add(2))::ap(Result.Err('err'))).toEqual(
        Result.Err('err')
      )
      expect(Result.Err('err')::ap(Result.Err('err'))).toEqual(
        Result.Err('err')
      )
    })
  })

  describe('foldl', () => {
    describe('with Ok', () => {
      it('transforms the maybe into a value', () => {
        expect(Result.Ok(2)::foldl(append, [])).toEqual([2])
      })
    })

    describe('with Err', () => {
      it('returns the accumulator', () => {
        expect(Result.Err('error')::foldl(append, [])).toEqual([])
      })
    })
  })
})

describe('Task', () => {
  it('creates a type with a fork function', () => {
    const t = Task(() => 'forked')
    expect(t.fork()).toBe('forked')
  })

  describe('.succeed', () => {
    it('creates a task that always succeeds', () => {
      const fail = jest.fn()
      const succeed = jest.fn()

      Task.succeed('successful').fork(fail, succeed)

      expect(fail).not.toHaveBeenCalled()
      expect(succeed).toHaveBeenCalledWith('successful')
    })
  })

  describe('.fail', () => {
    it('creates a task that always fails', () => {
      const fail = jest.fn()
      const succeed = jest.fn()

      Task.fail('error').fork(fail, succeed)

      expect(fail).toHaveBeenCalledWith('error')
      expect(succeed).not.toHaveBeenCalled()
    })
  })

  describe('.none', () => {
    it('does nothing', () => {
      const fail = jest.fn()
      const succeed = jest.fn()

      Task.none.fork(fail, succeed)

      expect(fail).not.toHaveBeenCalled()
      expect(succeed).not.toHaveBeenCalled()
    })
  })

  describe('.perform', () => {
    it('converts a failing task into one that succeeds', () => {
      const fail = jest.fn()
      const succeed = jest.fn()

      const task = Task.fail('failed but succeeds anyway')

      Task.perform(
        task,
        err => `Error: ${err}`,
        val => `Success: ${val}`
      ).fork(fail, succeed)

      expect(fail).not.toHaveBeenCalled()
      expect(succeed).toHaveBeenCalledWith('Error: failed but succeeds anyway')
    })

    it('converts a successful task into one that succeeds', () => {
      const fail = jest.fn()
      const succeed = jest.fn()

      const task = Task.succeed('it still succeeds')

      Task.perform(
        task,
        err => `Error: ${err}`,
        val => `Success: ${val}`
      ).fork(fail, succeed)

      expect(fail).not.toHaveBeenCalled()
      expect(succeed).toHaveBeenCalledWith('Success: it still succeeds')
    })

    describe('map', () => {
      it('maps a function over the content of a Task', () => {
        const s = Task.succeed(2)
        const f = Task.fail('err')

        let failureFn = jest.fn()
        let successFn = jest.fn()

        s::map(x => x + 1).fork(failureFn, successFn)

        expect(failureFn).not.toHaveBeenCalled()
        expect(successFn).toHaveBeenCalledWith(3)

        failureFn = jest.fn()
        successFn = jest.fn()

        f::map(x => x + 1).fork(failureFn, successFn)

        expect(failureFn).toHaveBeenCalledWith('err')
        expect(successFn).not.toHaveBeenCalled()
      })
    })

    describe('bimap', () => {
      it('maps a function over the content of a Task', () => {
        const s = Task.succeed(2)
        const f = Task.fail('err')

        let failureFn = jest.fn()
        let successFn = jest.fn()

        s::bimap(
          err => err + '!',
          x => x + 1
        ).fork(failureFn, successFn)

        expect(failureFn).not.toHaveBeenCalled()
        expect(successFn).toHaveBeenCalledWith(3)

        failureFn = jest.fn()
        successFn = jest.fn()

        f::bimap(
          err => err + '!',
          x => x + 1
        ).fork(failureFn, successFn)

        expect(failureFn).toHaveBeenCalledWith('err!')
        expect(successFn).not.toHaveBeenCalled()
      })
    })

    describe('flatten', () => {
      it('flattens a nested task', () => {
        const t = Task.succeed(Task.succeed(2))

        let failureFn = jest.fn()
        let successFn = jest.fn()

        t::flatten().fork(failureFn, successFn)

        expect(successFn).toHaveBeenCalledWith(2)
      })
    })

    describe('ap', () => {
      it('it applies the value of one task to the value of another', () => {
        const t = Task.succeed(x => x + 1)

        let failureFn = jest.fn()
        let successFn = jest.fn()

        t::ap(Task.succeed(2)).fork(failureFn, successFn)

        expect(successFn).toHaveBeenCalledWith(3)
      })
    })
  })

  describe('.toPromise', () => {
    it('converts a task into a promise', () => {
      let fail = jest.fn()
      let succeed = jest.fn()

      Task.toPromise(Task((_f, _s) => succeed('abc')))

      expect(fail).not.toHaveBeenCalled()
      expect(succeed).toHaveBeenCalledWith('abc')

      fail = jest.fn()
      succeed = jest.fn()

      Task.toPromise(Task((_f, _s) => fail('err')))

      expect(fail).toHaveBeenCalledWith('err')
      expect(succeed).not.toHaveBeenCalled()
    })
  })
})

describe('caseOf', () => {
  it('can pattern match against numbers', () => {
    const match = caseOf({
      1: num => `number one: ${num}`,
      [lt(4)]: num => `number two: ${num}`,
      _: num => `any number: ${num}`,
    })
    expect(match(1)).toBe('number one: 1')
    expect(match(2)).toBe('number two: 2')
    expect(match(4)).toBe('any number: 4')
  })

  it('can pattern match against strings', () => {
    const match = caseOf({
      'foo bar': str => `foo: ${str}`,
      [str => !!str.match(/baz/)]: str => `baz: ${str}`,
      _: str => `any string: ${str}`,
    })
    expect(match('foo bar')).toBe('foo: foo bar')
    expect(match('baz quux')).toBe('baz: baz quux')
    expect(match('baz qoo')).toBe('baz: baz qoo')
    expect(match('whatever')).toBe('any string: whatever')
  })

  it('can pattern match against union types', () => {
    const match = caseOf({
      [Maybe.Some]: val => `Some(${val})`,
      [Maybe.None]: () => `None()`,
    })
    expect(match(Maybe.Some('abc'))).toBe('Some(abc)')
    expect(match(Maybe.None())).toBe('None()')
  })

  it('can pattern match against arrays', () => {
    const match = caseOf({
      [[1, 2, 3]]: xs => `Array [1, 2, 3]: ${show(xs)}`,
      [[1, [2, Number]]]: xs => `Array [1, [2, Number]]: ${show(xs)}`,
      [['foo', String, 'baz']]: xs =>
        `Array ["foo", String, "baz"]: ${show(xs)}`,
      [[lt(4), Number]]: xs => `Array [Number, Number]: ${show(xs)}`,
      [[String]]: xs => `Array [String]: ${show(xs)}`,
      [[String, Spread(String)]]: xs =>
        `Array [String, Spread(String)]: ${show(xs)}`,
    })

    expect(match([1, 2, 3])).toBe('Array [1, 2, 3]: [ 1, 2, 3 ]')
    expect(match([1, [2, 3]])).toBe('Array [1, [2, Number]]: [ 1, [ 2, 3 ] ]')
    expect(match(['foo', 'bar', 'baz'])).toBe(
      'Array ["foo", String, "baz"]: [ "foo", "bar", "baz" ]'
    )
    expect(match([1, 2])).toBe('Array [Number, Number]: [ 1, 2 ]')
    expect(match(['foo'])).toBe('Array [String]: [ "foo" ]')
    expect(match(['foo', 'bar', 'baz', 'quux'])).toBe(
      'Array [String, Spread(String)]: [ "foo", "bar", "baz", "quux" ]'
    )
  })

  it('can pattern match against objects', () => {
    const match = caseOf({
      [{ a: Number, b: 'foo' }]: obj =>
        `Object { a: Number, b: "foo" }: ${show(obj)}`,
      [{ d: Array }]: obj => `Object { d: Array }: ${show(obj)}`,
      [{ d: x => !!x.match('!') }]: obj =>
        `Object { d: x => match("!") }: ${show(obj)}`,
      [{ a: { b: 2, c: Number } }]: obj =>
        `Object { a: { b: 2, c: Number } }: ${show(obj)}`,
    })

    expect(match({ a: 123, b: 'foo' })).toBe(
      'Object { a: Number, b: "foo" }: { a: 123, b: "foo" }'
    )

    expect(match({ d: ['foo!'] })).toBe(
      'Object { d: Array }: { d: [ "foo!" ] }'
    )

    expect(match({ d: 'foo!' })).toBe(
      'Object { d: x => match("!") }: { d: "foo!" }'
    )

    expect(match({ a: { b: 2, c: 1234 } })).toBe(
      'Object { a: { b: 2, c: Number } }: { a: { b: 2, c: 1234 } }'
    )
  })
})

describe('Number', () => {
  describe('clone', () => {
    it('returns the same number', () => {
      expect(clone(2)).toBe(2)
    })
  })

  describe('shallowClone', () => {
    it('returns the same number', () => {
      expect(shallowClone(2)).toBe(2)
    })
  })
})

describe('Boolean', () => {
  describe('clone', () => {
    it('returns the true when called with true', () => {
      expect(clone(true)).toBe(true)
    })

    it('returns the false when called with false', () => {
      expect(clone(false)).toBe(false)
    })
  })

  describe('shallowClone', () => {
    it('returns the true when called with true', () => {
      expect(shallowClone(true)).toBe(true)
    })

    it('returns the false when called with false', () => {
      expect(shallowClone(false)).toBe(false)
    })
  })
})

describe('RegExp', () => {
  describe('clone', () => {
    it('returns the same regex', () => {
      const regex = /foo/gim
      const clonedRegex = clone(regex)

      expect(show(regex)).toBe('/foo/gim')
      expect(show(clonedRegex)).toBe('/foo/gim')
    })
  })

  describe('shallowClone', () => {
    it('returns the same regex', () => {
      const regex = /foo/gim
      const clonedRegex = shallowClone(regex)

      expect(show(regex)).toBe('/foo/gim')
      expect(show(clonedRegex)).toBe('/foo/gim')
    })
  })

  describe('empty', () => {
    it('returns an empty regex', () => {
      expect(empty(/foo/gim)).toEqual(new RegExp())
    })
  })

  describe('append', () => {
    it('merges two regular expressions', () => {
      expect(/abc/im::append(/def/g)).toEqual(/abcdef/gim)
      expect(/abc/im::append(/def/)).toEqual(/abcdef/im)
      expect(/abc/m::append(/def/g)).toEqual(/abcdef/gm)
    })
  })
})

describe('Date', () => {
  describe('clone', () => {
    it('returns cloned date instance', () => {
      const date = new Date('2020-06-30')
      const clonedDate = clone(date)
      expect(date.toString()).toBe(clonedDate.toString())
      date.setYear('2018')
      expect(date.toDateString()).toBe('Sat Jun 30 2018')
      expect(clonedDate.toDateString()).toBe('Tue Jun 30 2020')
    })
  })

  describe('shallowClone', () => {
    it('returns cloned date instance', () => {
      const date = new Date('2020-06-30')
      const clonedDate = shallowClone(date)
      expect(date.toString()).toBe(clonedDate.toString())
      date.setYear('2018')
      expect(date.toDateString()).toBe('Sat Jun 30 2018')
      expect(clonedDate.toDateString()).toBe('Tue Jun 30 2020')
    })
  })
})

describe('Array', () => {
  describe('clone', () => {
    it('returns a shallowly cloned array', () => {
      const xs = [1, 2, [3], [[4]]]
      const clonedXs = clone(xs)

      expect(show(xs)).toBe(show(clonedXs))

      xs[0] = 'foo'

      expect(xs[0]).toBe('foo')
      expect(clonedXs[0]).toBe(1)

      xs[2][0] = 'foo'

      expect(xs[2][0]).toBe('foo')
      expect(clonedXs[2][0]).toBe(3)

      xs[3][0][0] = 'bar'

      expect(xs[3][0][0]).toBe('bar')
      expect(clonedXs[3][0][0]).toBe(4)
    })
  })

  describe('shallowClone', () => {
    it('returns a shallowly cloned array', () => {
      const xs = [1, 2, [3]]
      const clonedXs = shallowClone(xs)
      expect(show(xs)).toBe(show(clonedXs))

      xs[0] = 'foo'

      expect(xs[0]).toBe('foo')
      expect(clonedXs[0]).toBe(1)

      xs[2][0] = 'foo'

      expect(xs[2][0]).toBe('foo')
      expect(clonedXs[2][0]).toBe('foo')
    })
  })

  describe('count', () => {
    it('returns its size', () => {
      expect(count([1, 2, 3])).toBe(3)
    })
  })

  describe('get', () => {
    it('returns the value wrapped inside of a Maybe.Some if it exists', () => {
      expect(
        get(1, [1, 2, 3])::caseOf({
          [Maybe.Some]: x => x,
          [Maybe.None]: () => 0,
        })
      ).toBe(2)
    })

    it('returns Maybe.None if no value exists at the index', () => {
      expect(
        get(8, [1, 2, 3])::caseOf({
          [Maybe.Some]: x => x,
          [Maybe.None]: () => 'no match',
        })
      ).toBe('no match')
    })
  })

  describe('first', () => {
    it('returns the first element of an array wrapped in a Some if it exists', () => {
      expect(first([1, 2, 3])).toEqual(Maybe.Some(1))
    })

    it('returns Maybe.None for empty arrays', () => {
      expect(first([])).toEqual(Maybe.None())
    })
  })

  describe('rest', () => {
    it('returns all the elements of an array except the first', () => {
      expect(rest([1, 2, 3])).toEqual([2, 3])
    })

    it('returns empty array for empty arrays', () => {
      expect(rest([])).toEqual([])
    })
  })

  describe('foldlKV', () => {
    it('iterates over an array yielding the element and index starting from the left', () => {
      expect(
        foldlKV((k, v, acc) => acc::append([k, v]), [], ['a', 'b', 'c'])
      ).toEqual([
        [0, 'a'],
        [1, 'b'],
        [2, 'c'],
      ])
    })
  })

  describe('foldrKV', () => {
    it('iterates over an array yielding the element and index starting from the left', () => {
      expect(
        foldrKV((k, v, acc) => acc::append([k, v]), [], ['a', 'b', 'c'])
      ).toEqual([
        [2, 'c'],
        [1, 'b'],
        [0, 'a'],
      ])
    })
  })

  describe('foldl', () => {
    it('transforms an array by passing each value and an accumulator through a function', () => {
      expect([1, 2, 3]::foldl((acc, x) => acc + x, 0)).toEqual(6)
    })
  })

  describe('foldr', () => {
    it('transforms an array by passing each value and an accumulator through a function starting from the right', () => {
      expect([1, 2, 3]::foldr(append, [])).toEqual([3, 2, 1])
    })
  })

  describe('assoc', () => {
    it('associates an existing index with a new value', () => {
      const xs = [1, 2, 3]
      const newXs = xs::assoc(0, 'A')

      expect(xs).toEqual([1, 2, 3])
      expect(newXs).toEqual(['A', 2, 3])
    })

    it('adds a new value to the end of an array when index is equal to the length', () => {
      const xs = [1, 2, 3]
      const newXs = xs::assoc(3, 4)

      expect(xs).toEqual([1, 2, 3])
      expect(newXs).toEqual([1, 2, 3, 4])
    })

    it('does nothing when index is greater than the arrays length', () => {
      const xs = [1, 2, 3]
      const newXs = xs::assoc(4, 'A')

      expect(xs).toEqual([1, 2, 3])
      expect(newXs).toEqual([1, 2, 3])
    })
  })

  describe('dissoc', () => {
    it('removes a given index from an array', () => {
      const xs = [1, 2, 3]
      expect(xs::dissoc(1)).toEqual([1, 3])
      expect(xs).toEqual([1, 2, 3])
    })
  })

  describe('map', () => {
    it('returns a new array with the result of applying a transformation function to each element', () => {
      const xs = ['a', 'b', 'c']
      const mapped = xs::map(x => x + '!')

      expect(xs).toEqual(['a', 'b', 'c'])
      expect(mapped).toEqual(['a!', 'b!', 'c!'])

      xs[0] = '-'
      expect(xs[0]).toEqual('-')
      expect(mapped[0]).toEqual('a!')
    })
  })

  describe('empty', () => {
    it('returns an empty array', () => {
      expect([1, 2, 3]::empty()).toEqual([])
    })
  })

  describe('append', () => {
    expect([1, 2]::append(3)).toEqual([1, 2, 3])
  })

  describe('pure', () => {
    it('takes any non-null value and wrapps it in an array', () => {
      expect(pure(2, [])).toEqual([2])
    })
  })

  describe('flatten', () => {
    it('flattens a nested array one level', () => {
      expect(
        [
          [1, 2],
          [3, 4],
        ]::flatten()
      ).toEqual([1, 2, 3, 4])
    })
  })

  describe('ap', () => {
    it('applies a list of values to a list of functions', () => {
      const add = curry((a, b) => a + b)
      expect([add(1), add(2)]::ap([3, 4])).toEqual([
        /* 1 + 3 */ 4,
        /* 1 + 4 */ 5,
        /* 2 + 3 */ 5,
        /* 2 + 4 */ 6,
      ])
    })
  })

  describe('keys', () => {
    it('returns a list of all the indexes of an array', () => {
      expect(['a', 'b', 'c']::keys()).toEqual([0, 1, 2])
    })
  })

  describe('join', () => {
    it('creates a string by joining each element with a separator', () => {
      expect(['a', 'b', 'c']::join(', ')).toEqual('a, b, c')
    })
  })

  describe('slice', () => {
    it('returns a new array with only the values between start and end', () => {
      expect(['a', 'b', 'c', 'd', 'e']::slice(1, 4)).toEqual(['b', 'c', 'd'])
    })
  })
})

describe('String', () => {
  describe('clone', () => {
    it('returns a cloned string', () => {
      const str = 'foo'
      const clonedStr = clone(str)

      expect(str).toBe(str)
    })
  })

  describe('shallowClone', () => {
    it('returns a shallowly cloned string', () => {
      const str = 'foo'
      const clonedStr = shallowClone(str)

      expect(str).toBe(str)
    })
  })

  describe('count', () => {
    it('returns its size', () => {
      expect(count('bar')).toBe(3)
    })
  })

  describe('get', () => {
    it('returns the character wrapped inside of a Maybe.Some if it exists', () => {
      expect(
        get(1, 'bar')::caseOf({
          [Maybe.Some]: x => x,
          [Maybe.None]: () => '-',
        })
      ).toBe('a')
    })

    it('returns Maybe.None if no value exists at the index', () => {
      expect(
        get(8, 'bar')::caseOf({
          [Maybe.Some]: x => x,
          [Maybe.None]: () => '-',
        })
      ).toBe('-')
    })
  })

  describe('first', () => {
    it('returns the first character of a string wrapped in a Some if it exists', () => {
      expect(first('abc')).toEqual(Maybe.Some('a'))
    })

    it('returns Maybe.None for empty strings', () => {
      expect(first('')).toEqual(Maybe.None())
    })
  })

  describe('rest', () => {
    it('returns all the characters of a string except the first', () => {
      expect(rest('abc')).toEqual('bc')
    })

    it('returns empty string for empty strings', () => {
      expect(rest('')).toEqual('')
    })
  })

  describe('foldlKV', () => {
    it('iterates over a string yielding the element and index starting from the left', () => {
      expect('abc'::foldlKV((k, v, acc) => acc::append([k, v]), [])).toEqual([
        [0, 'a'],
        [1, 'b'],
        [2, 'c'],
      ])
    })
  })

  describe('foldl', () => {
    it('transforms an object by running each element and an accumulator through a function', () => {
      expect('abc'::foldl(append, [])).toEqual(['a', 'b', 'c'])
    })
  })

  describe('foldrKV', () => {
    it('iterates over an array yielding the element and index starting from the left', () => {
      expect('abc'::foldrKV((k, v, acc) => acc::append([k, v]), [])).toEqual([
        [2, 'c'],
        [1, 'b'],
        [0, 'a'],
      ])
    })
  })

  describe('foldl', () => {
    it('transforms an object by running each element and an accumulator through a function starting from the last character', () => {
      expect('abc'::foldr(append, [])).toEqual(['c', 'b', 'a'])
    })
  })

  describe('assoc', () => {
    it('associates an existing index with a new character', () => {
      const str = 'bar'
      const newStr = str::assoc(1, 'A')

      expect(str).toEqual('bar')
      expect(newStr).toEqual('bAr')
    })

    it('does nothing with out of bound indexes', () => {
      const str = 'bar'
      const newStr = str::assoc(10, 'A')

      expect(str).toEqual('bar')
      expect(newStr).toEqual('bar')
    })
  })

  describe('dissoc', () => {
    it('removes a given index from an array', () => {
      const str = 'bar'
      expect(str::dissoc(1)).toEqual('br')
      expect(str).toEqual('bar')
    })
  })

  describe('map', () => {
    it('returns a new string with the result of applying a transformation function to each element', () => {
      const str = 'abc'
      const mapped = str::map(x => x.toUpperCase())

      expect(str).toEqual('abc')
      expect(mapped).toEqual('ABC')
    })
  })

  describe('empty', () => {
    it('returns an empty string', () => {
      expect('abc'::empty()).toEqual('')
    })
  })

  describe('append', () => {
    expect('ab'::append('c')).toEqual('abc')
  })

  describe('keys', () => {
    it('returns a list of all the indexes of a string', () => {
      expect('abc'::keys()).toEqual([0, 1, 2])
    })
  })

  describe('join', () => {
    it('creates a new string by joining each character with a separator', () => {
      expect('abc'::join(', ')).toEqual('a, b, c')
    })
  })

  describe('slice', () => {
    it('returns a new string with only the characters between start and end', () => {
      expect('abcde'::slice(1, 4)).toEqual('bcd')
    })
  })
})

describe('Object', () => {
  describe('clone', () => {
    it('returns a deeply cloned object', () => {
      const obj = { a: { b: { c: 'abc' } } }
      const clonedObj = clone(obj)

      clonedObj.a.b.c = 'def'

      expect(obj).toEqual({ a: { b: { c: 'abc' } } })
      expect(clonedObj).toEqual({ a: { b: { c: 'def' } } })
    })
  })

  describe('shallowClone', () => {
    const obj = { a: 1, b: { c: 'abc' } }
    const clonedObj = clone(obj)

    clonedObj.a = 'A'

    expect(obj).toEqual({ a: 1, b: { c: 'abc' } })
    expect(clonedObj).toEqual({ a: 'A', b: { c: 'abc' } })
  })

  describe('count', () => {
    it('returns its size', () => {
      expect(count({ a: 1, b: 2, c: 3 })).toBe(3)
    })
  })

  describe('get', () => {
    it('returns the value associated with the key wrapped inside of a Maybe.Some if it exists', () => {
      expect(
        get('a', { a: 'A', b: 'B' })::caseOf({
          [Maybe.Some]: x => x,
          [Maybe.None]: () => '-',
        })
      ).toBe('A')
    })

    it('returns Maybe.None if no value exists at the index', () => {
      expect(
        get('c', { a: 'A', b: 'B' })::caseOf({
          [Maybe.Some]: x => x,
          [Maybe.None]: () => '-',
        })
      ).toBe('-')
    })
  })

  describe('first', () => {
    it('returns the first value of an object wrapped in a Some if it exists', () => {
      expect(first({ a: 1, b: 2, c: 3 })).toEqual(Maybe.Some(1))
    })

    it('returns Maybe.None for empty objects', () => {
      expect(first({})).toEqual(Maybe.None())
    })
  })

  describe('rest', () => {
    it('returns a new object with the first key removed', () => {
      expect(rest({ a: 1, b: 2, c: 3 })).toEqual({ b: 2, c: 3 })
    })

    it('returns empty object for empty objects', () => {
      expect(rest({})).toEqual({})
    })
  })

  describe('foldlKV', () => {
    it('iterates over a string yielding the element and index starting from the left', () => {
      expect(
        { a: 'A', b: 'B', c: 'C' }::foldlKV(
          (_, [k, v], acc) => acc::append([k, v]),
          []
        )
      ).toEqual([
        ['a', 'A'],
        ['b', 'B'],
        ['c', 'C'],
      ])
    })
  })

  describe('foldrKV', () => {
    it('iterates over an array yielding the element and index starting from the left', () => {
      expect(
        { a: 'A', b: 'B', c: 'C' }::foldrKV(
          (key, kvp, acc) => acc::append(kvp),
          []
        )
      ).toEqual([
        ['c', 'C'],
        ['b', 'B'],
        ['a', 'A'],
      ])
    })
  })

  describe('foldl', () => {
    it('transforms an object by passing each value and an accumulator through a function', () => {
      expect(
        { a: 1, b: 2, c: 3 }::foldl(([_, val], acc) => acc + val, 0)
      ).toEqual(6)
    })
  })

  describe('foldr', () => {
    it('transforms an object by passing each value and an accumulator through a function starting from the right', () => {
      expect(
        { a: 1, b: 2, c: 3 }::foldr(([_, val], acc) => acc::append(val), [])
      ).toEqual([3, 2, 1])
    })
  })

  describe('assoc', () => {
    it('associates a key with a new value', () => {
      const obj = { a: 'a', b: 'b' }
      const newObj = obj::assoc('a', 'A')

      expect(obj).toEqual({ a: 'a', b: 'b' })
      expect(newObj).toEqual({ a: 'A', b: 'b' })
    })

    it('can add new key/value pairs', () => {
      const obj = { a: 'a', b: 'b' }
      const newObj = obj::assoc('c', 'C')

      expect(obj).toEqual({ a: 'a', b: 'b' })
      expect(newObj).toEqual({ a: 'a', b: 'b', c: 'C' })
    })
  })

  describe('dissoc', () => {
    it('removes a given key from an object', () => {
      const obj = { a: 'a', b: 'b' }
      expect(obj::dissoc('a')).toEqual({ b: 'b' })
      expect(obj).toEqual({ a: 'a', b: 'b' })
    })
  })

  describe('map', () => {
    it('returns a new object with the result of applying a transformation function to each value', () => {
      const obj = { a: 'a', b: 'b', c: 'c' }
      const mapped = obj::map(x => x.toUpperCase())

      expect(obj).toEqual({ a: 'a', b: 'b', c: 'c' })
      expect(mapped).toEqual({ a: 'A', b: 'B', c: 'C' })
    })
  })

  describe('empty', () => {
    it('returns an empty object', () => {
      expect({ a: 'a', b: 'b' }::empty()).toEqual({})
    })
  })

  describe('append', () => {
    it('appends a key/value pair to an object', () => {
      expect({ a: 'abc' }::append(['b', 'def'])).toEqual({
        a: 'abc',
        b: 'def',
      })
    })
  })

  describe('keys', () => {
    it('returns a list of all the keys in an object', () => {
      expect({ a: 1, b: 2, c: 3 }::keys()).toEqual(['a', 'b', 'c'])
    })
  })
})

describe('BiFunctor Utils', () => {
  describe('mapError', () => {
    it('maps a function over the error case of a BiFunctor', () => {
      expect(Result.Err(2)::mapError(x => x + 1)).toEqual(Result.Err(3))
      expect(Result.Ok('ok')::mapError(x => x + 1)).toEqual(Result.Ok('ok'))
    })
  })
})

describe('Applicative Utils', () => {
  describe('liftA2', () => {
    it('lifts a regular function into one that can operate on two applicatives', () => {
      const add = curry((a, b) => a + b)
      expect(liftA2(add, Maybe.Some(2), Maybe.Some(3))).toEqual(Maybe.Some(5))
    })
  })

  describe('liftA3', () => {
    it('lifts a regular function into one that can operate on three applicatives', () => {
      const add = curry((a, b, c) => a + b + c)
      expect(liftA3(add, Maybe.Some(2), Maybe.Some(3), Maybe.Some(4))).toEqual(
        Maybe.Some(9)
      )
    })
  })

  describe('liftA4', () => {
    it('lifts a regular function into one that can operate on four applicatives', () => {
      const add = curry((a, b, c, d) => a + b + c + d)
      expect(
        liftA4(add, Maybe.Some(2), Maybe.Some(3), Maybe.Some(4), Maybe.Some(5))
      ).toEqual(Maybe.Some(14))
    })
  })

  describe('liftA5', () => {
    it('lifts a regular function into one that can operate on five applicatives', () => {
      const add = curry((a, b, c, d, e) => a + b + c + d + e)
      expect(
        liftA5(
          add,
          Maybe.Some(2),
          Maybe.Some(3),
          Maybe.Some(4),
          Maybe.Some(5),
          Maybe.Some(6)
        )
      ).toEqual(Maybe.Some(20))
    })
  })

  describe('liftA6', () => {
    it('lifts a regular function into one that can operate on five applicatives', () => {
      const add = curry((a, b, c, d, e, f) => a + b + c + d + e + f)
      expect(
        liftA6(
          add,
          Maybe.Some(2),
          Maybe.Some(3),
          Maybe.Some(4),
          Maybe.Some(5),
          Maybe.Some(6),
          Maybe.Some(7)
        )
      ).toEqual(Maybe.Some(27))
    })
  })
})

describe('Monadic Utils', () => {
  describe('flatMap', () => {
    it('maps a function over a functor and flattens the result', () => {
      expect(Maybe.Some(2)::flatMap(x => Maybe.Some(x + 2))).toEqual(
        Maybe.Some(4)
      )

      expect([1, 2, 3]::flatMap(x => ['x', x])).toEqual([
        'x',
        1,
        'x',
        2,
        'x',
        3,
      ])
    })
  })
})

describe('Collection Utils', () => {
  describe('mapKV', () => {
    it('works like map but also passes the key to the function', () => {
      expect([1, 2, 3]::mapKV((k, v) => k + v)).toEqual([1, 3, 5])
    })
  })

  describe('filterKV', () => {
    it('filters a collection by yielding each key/value to a predicate function', () => {
      expect(
        ['a', 'b', 'c']::filterKV((k, v) => v === 'a' || k === 1)
      ).toEqual(['a', 'b'])

      expect('abc'::filterKV((k, v) => v === 'a' || k === 1)).toEqual('ab')

      expect(
        { a: 1, b: 2, c: 3 }::filterKV((k, [_, v]) => k === 'a' || v === 2)
      ).toEqual({ a: 1, b: 2 })
    })
  })

  describe('filter', () => {
    it('filters a collection by yielding each value to a predicate function', () => {
      expect(['a', 'b', 'c']::filter(v => v === 'a')).toEqual(['a'])

      expect('abc'::filter(v => v === 'a')).toEqual('a')

      expect({ a: 1, b: 2, c: 3 }::filter(([k, v]) => v === 2)).toEqual({
        b: 2,
      })
    })
  })

  describe('removeKV', () => {
    it('removes items from a collection by yielding each key/value to a predicate function', () => {
      expect(
        ['a', 'b', 'c']::removeKV((k, v) => v === 'a' || k === 1)
      ).toEqual(['c'])

      expect('abc'::removeKV((k, v) => v === 'a' || k === 1)).toEqual('c')

      expect(
        { a: 1, b: 2, c: 3 }::removeKV((k, [_, v]) => k === 'a' || v === 2)
      ).toEqual({ c: 3 })
    })
  })

  describe('remove', () => {
    it('removes items from a collection by yielding each value to a predicate function', () => {
      expect(['a', 'b', 'c']::remove(v => v === 'a')).toEqual(['b', 'c'])

      expect('abc'::remove(v => v === 'a')).toEqual('bc')

      expect({ a: 1, b: 2, c: 3 }::remove(([k, v]) => v === 2)).toEqual({
        a: 1,
        c: 3,
      })
    })
  })

  describe('getOrElse', () => {
    it('returs the value associated with the given key if it exists otherwise it returns the fallback', () => {
      expect(['a', 'b', 'c']::getOrElse(1, 'not-found')).toEqual('b')
      expect(['a', 'b', 'c']::getOrElse(8, 'not-found')).toEqual('not-found')
    })
  })

  describe('getIn', () => {
    it('returns the value associated with a given path wrapped in a Maybe', () => {
      expect({ a: [{ b: 2 }] }::getIn(['a', 0, 'b'])).toEqual(Maybe.Some(2))
      expect({ a: [{ b: 2 }] }::getIn(['a', 1, 'b'])).toEqual(Maybe.None())
    })
  })

  describe('getInOrElse', () => {
    it('returns the value associated with a given path if it exists otherwise it returns the fallback', () => {
      expect(
        { a: [{ b: 2 }] }::getInOrElse(['a', 0, 'b'], 'not-found')
      ).toEqual(2)
      expect(
        { a: [{ b: 2 }] }::getInOrElse(['a', 1, 'b'], 'not-found')
      ).toEqual('not-found')
    })
  })

  describe('assocIn', () => {
    it('associates a value with a path', () => {
      expect({ a: [{ b: 2 }] }::assocIn(['a', 0, 'b'], 3)).toEqual({
        a: [{ b: 3 }],
      })
      expect({ a: [{ b: 2 }] }::assocIn(['a', 0, 'c'], 4)).toEqual({
        a: [{ b: 2, c: 4 }],
      })
    })
  })

  describe('dissocIn', () => {
    it('removes the value at a given path', () => {
      expect({ a: [{ b: 2 }] }::dissocIn(['a', 0, 'b'])).toEqual({
        a: [{}],
      })
    })
  })

  describe('any', () => {
    it('returns true if at least one of its elements satisfies the predicate', () => {
      expect([1, 2, 3]::any(x => x === 2)).toBe(true)
      expect({ a: 1, b: 2, c: 3 }::any(([k, v]) => v === 2)).toBe(true)
    })

    it('returns false if none of its elements satisfies the predicate', () => {
      expect([1, 2, 3]::any(x => x === 12)).toBe(false)
      expect({ a: 1, b: 2, c: 3 }::any(([k, v]) => v === 12)).toBe(false)
    })
  })

  describe('every', () => {
    it('returns true if all of its elements satisfies the predicate', () => {
      expect([1, 2, 3]::every(x => x !== 5)).toBe(true)
      expect({ a: 1, b: 2, c: 3 }::every(([k, v]) => v !== 5)).toBe(true)
    })

    it('returns false if only some of its elements satisfies the predicate', () => {
      expect([1, 2, 3]::every(x => x === 2)).toBe(false)
      expect({ a: 1, b: 2, c: 3 }::every(([k, v]) => v === 2)).toBe(false)
    })

    it('returns false if none of its elements satisfies the predicate', () => {
      expect([1, 2, 3]::every(x => x === 12)).toBe(false)
      expect({ a: 1, b: 2, c: 3 }::every(([k, v]) => v === 12)).toBe(false)
    })
  })

  describe('evolve', () => {
    it('produces a new value by applying a receipt of changes', () => {
      expect(
        { a: { b: 2 }, d: 3 }::evolve({
          a: { c: 3 },
          d: 4,
        })
      ).toEqual({ a: { b: 2, c: 3 }, d: 4 })

      expect(
        { a: { b: 2 }, d: 3 }::evolve({
          a: { c: 3 },
          d: x => x + 4,
        })
      ).toEqual({ a: { b: 2, c: 3 }, d: 7 })

      const Person = Type({ name: String, age: Number })

      const janeDoe = Person('Jane Doe', 30)

      expect(
        janeDoe::evolve({
          name: 'John Doe',
          age: 33,
        })
      ).toEqual(Person('John Doe', 33))

      expect(() =>
        janeDoe::evolve({
          name: 33,
          age: 'John Doe',
        })
      ).toThrow(TypeError)
    })
  })
})

describe('Logic Utils', () => {
  describe('not', () => {
    it('returns true when called with a falsy value', () => {
      expect(not(false)).toBe(true)
      expect(not('')).toBe(true)
      expect(not(0)).toBe(true)
    })

    it('returns false when called with a truthy value', () => {
      expect(not(true)).toBe(false)
      expect(not('foo')).toBe(false)
      expect(not(123)).toBe(false)
    })
  })

  describe('equal', () => {
    it('returns true when called with the same values', () => {
      expect(equal(1, 1)).toBe(true)
      expect(equal('foo', 'foo')).toBe(true)
      const xs = [1, 2, 3]
      expect(equal(xs, xs)).toBe(true)
    })

    it('returns false when called with different values', () => {
      expect(equal(1, 2)).toBe(false)
      expect(equal('foo', 'bar')).toBe(false)
      expect(equal([1, 2, 3], [1, 2, 3])).toBe(false)
    })
  })

  describe('deepEqual', () => {
    it('performs a deep equality check', () => {
      expect([1, [2, 3]]::deepEqual([1, [2, 3]])).toEqual(true)
      expect([1, [2, 4]]::deepEqual([1, [2, 3]])).toEqual(false)
      expect([1, [2, [3]]]::deepEqual([1, [2, 3]])).toEqual(false)

      expect({ a: 1, b: { c: 2 } }::deepEqual({ a: 1, b: { c: 2 } })).toEqual(
        true
      )
      expect({ a: 1, b: { c: 3 } }::deepEqual({ a: 1, b: { c: 2 } })).toEqual(
        false
      )
      expect(
        { a: 1, b: { c: { d: 3 } } }::deepEqual({ a: 1, b: { c: 2 } })
      ).toEqual(false)

      expect(
        { a: 1, b: { c: [2, 3] } }::deepEqual({ a: 1, b: { c: [2, 3] } })
      ).toEqual(true)

      expect(
        { a: 1, b: { c: [2, 4] } }::deepEqual({ a: 1, b: { c: [2, 3] } })
      ).toEqual(false)
    })
  })
})

describe('Function Utils', () => {
  describe('comp', () => {
    it('performs right-to-left function composition', () => {
      expect(comp([x => x.toUpperCase(), x => x + 'bar'])('foo')).toEqual(
        'FOOBAR'
      )
    })
  })

  describe('Flips the argument order of a function that takes two arguments', () => {
    it('performs right-to-left function composition', () => {
      const fn = curry((a, b) => [a, b])
      expect(flip(fn)('foo', 'bar')).toEqual(['bar', 'foo'])
    })
  })
})

describe('String Utils', () => {
  describe('split', () => {
    it('splits a string by string pattern', () => {
      expect('b.a.r'::split('.')).toEqual(['b', 'a', 'r'])
    })

    it('splits a string by regex pattern', () => {
      expect('b.a.r'::split(/\.a\./)).toEqual(['b', 'r'])
    })
  })

  describe('replace', () => {
    it('replaces a string by string pattern', () => {
      expect('abcdef'::replace('cd', '-')).toEqual('ab-ef')
    })

    it('replaces a string by regex pattern', () => {
      expect('abcdef'::replace(/cd/, '-')).toEqual('ab-ef')
    })
  })

  describe('lowercase', () => {
    it('turns each character in a string to lowercase', () => {
      expect('FOOBAR'::lowercase()).toEqual('foobar')
    })
  })

  describe('uppercase', () => {
    it('turns each character in a string to uppercase', () => {
      expect('foobar'::uppercase()).toEqual('FOOBAR')
    })
  })

  describe('capitalize', () => {
    it('capitalizes a string', () => {
      expect('fooBar'::capitalize()).toEqual('Foobar')
    })
  })
})
