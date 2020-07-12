export const ProtocolSym = '____Protocol'
export const TypeKey = '____TypeKey'
export const TypeKeys = '____TypeKeys'
export const KindKey = '____KindKey'
export const CustomType = '____CustomType'
export const TypeConstructor = '____TypeConstructor'
export const UnionType = '____UnionType'
export const UnionCases = '____UnionCases'
export const UnionCase = '____UnionCase'
export const UnionValues = '____UnionValues'

export const __ = { kind: 'Placeholder' }

export const Any = { kind: 'Any' }
export const Null = { kind: 'Null' }

export const OneOf = types => ({
  kind: 'OneOf',
  types,
})

export const Implements = (...fns) => ({
  kind: 'Implements',
  fns,
})

const ObjectWithPlaceholder = obj => ({
  kind: 'ObjectWithPlaceholder',
  obj,
})

export const Spread = type => ({
  kind: 'Spread',
  type,
})

export const dispatchMap = {}

const withMeta = (x, meta) => {
  x.___meta___ = x.___meta___ || {}

  Object.keys(meta).forEach(key => {
    x.___meta___[key] = meta[key]
  })

  return x
}

export const getType = implementor => {
  if (implementor == null) return Null

  return implementor.constructor
}

export const showType = T => {
  if (T == null) return 'Null'

  if (T === Any) return 'Any'

  if (T.kind === 'OneOf') {
    return `OneOf([ ${T.types
      .map(t => {
        if (typeof t === 'function' || t[TypeKey] || t[UnionType] || t._tag) {
          return showType(t)
        } else {
          return show(t)
        }
      })
      .join(', ')} ]) >`
  }

  if (T._tag === 'TypedUnion') {
    return `${T._name}(${T._types.map(showType).join(', ')})`
  }

  if (T.kind === 'ObjectWithPlaceholder') {
    return showType(T.obj)
  }

  if (T.kind === 'Spread') {
    return `Spread(${showType(T.type)})`
  }

  if (T.kind === 'Implements') {
    return `Implements([ ${T.fns.map(f => show(f)).join(', ')} ])`
  }

  if (T === String || typeof T === 'string') return 'String'

  if (T === Number || typeof T === 'number') return 'Number'

  if (T === Boolean) return 'Boolean'

  if (T === RegExp || T instanceof RegExp) return 'RegExp'

  if (T === Array) return 'Array'

  if (T === Object) return 'Object'

  if (T === Map) return 'Map'

  if (T === WeakMap) return 'WeakMap'

  if (T === Set) return 'Set'

  if (T === WeakSet) return 'WeakSet'

  if (T.constructor !== Function) {
    const mapper = dispatchMap[showType(getType(T))] || {}
    if (typeof mapper.showType === 'function') {
      return mapper.showType(T)
    }
  }

  if (Array.isArray(T)) {
    return `[ ${T.map(showType).join(', ')} ]`
  }

  if (T[KindKey] === CustomType) return T[TypeKey]

  if (T[KindKey] === UnionType) {
    if (T[UnionCase]) return `${T[TypeKey]}.${T[UnionCase]}`
    else return T[TypeKey]
  }

  if (T === Function) return 'Function'

  if (typeof T === 'function' && T.name) {
    return T.name
  }

  if (T.constructor === Object)
    return `{ ${Object.keys(T)
      .map(key => `${key}: ${showType(T[key])}`)
      .join(', ')} }`

  if (typeof T === 'string') return `"${T}"`

  return T.toString()
    .replace(/function\s*/, '')
    .replace(/\(\)/, '')
    .replace(/\{\s\[native code\]\s\}/, '')
    .replace(/\{\}/, '')
    .replace(/\s*/g, '')
}

export const show = withMeta(
  x => {
    if (x === null) {
      return 'null'
    }

    if (x === undefined) {
      return 'undefined'
    }

    if (Array.isArray(x)) {
      return `[ ${x.map(show).join(', ')} ]`
    }

    if (typeof x === 'string') {
      return `"${x}"`
    }

    if (typeof x === 'function') {
      if (x.___meta___ && x.___meta___.name) {
        return `<function ${x.___meta___.name}>`
      } else {
        return `<function>`
      }
    }

    if (x[KindKey] === CustomType) {
      return `${x[TypeKey]}(${x[TypeKeys].map(key => show(x[key])).join(', ')})`
    }

    if (x[KindKey] === UnionType) {
      return `${x[TypeKey]}.${x[UnionCase]}(${x[UnionValues].map(show).join(
        ', '
      )})`
    }

    if (is(Object, x)) {
      return `{ ${Object.keys(x)
        .map(key => `${key}: ${show(x[key])}`)
        .join(', ')} }`
    }

    if (x::is(Map)) {
      const entries = []

      for (const [key, val] of x.entries()) {
        entries.push(`${show(key)}: ${show(val)}`)
      }

      return `Map { ${entries.join(', ')} }`
    }

    if (x::is(WeakMap)) {
      return 'WeakMap {}'
    }

    if (x::is(Set)) {
      const values = []

      for (const val of x.values()) {
        values.push(show(val))
      }

      return `Set { ${values.join(', ')} }`
    }

    if (x::is(WeakSet)) {
      return 'WeakSet {}'
    }

    const mapper = dispatchMap[showType(getType(x))] || {}

    if (typeof mapper.show === 'function') {
      return mapper.show(x)
    }

    return x.toString()
  },
  {
    name: 'show',
    docs: {
      declaration: 'Any -> String',
      docstr: 'Returns the string representation of an object',
    },
  }
)

export const curry = withMeta(
  (f, n) => {
    const arity = n == null ? f.length : n

    const name = f.___meta___ && f.___meta___.name ? f.___meta___.name : f.name
    const declaration = f.___meta___ ? f.___meta___.declaration : []
    const docs = f.___meta___ ? f.___meta___.docs : {}

    if (arity < 2) return withMeta(f, { name, declaration, docs })

    return withMeta(
      (...args) => {
        const filteredArgs = args.filter(arg => arg !== __)
        const realArity = filteredArgs.length

        if (realArity >= arity) return f(...args)
        else {
          const curriedFn = (...partialArgs) => {
            let newArgs = []

            for (let i = 0; i < args.length; i++) {
              if (args[i] === __) {
                newArgs[i] = partialArgs.shift() || __
              } else {
                newArgs[i] = args[i]
              }
            }

            const argsToApply = newArgs.concat(partialArgs)

            if (argsToApply.filter(arg => arg !== __).length < arity) {
              return withMeta(
                curry((...args) => {
                  const newArgs = []
                  for (let i = 0; i < argsToApply.length; i++) {
                    if (argsToApply[i] === __) {
                      newArgs[i] = args.shift() || __
                    } else {
                      newArgs[i] = argsToApply[i]
                    }
                  }
                  return f(...newArgs.concat(args))
                }, arity - argsToApply.filter(arg => arg !== __).length),
                {
                  name:
                    process.NODE_ENV === 'production'
                      ? name
                      : `${name}(${argsToApply
                          .map(arg => (arg === __ ? '__' : show(arg)))
                          .join(', ')})`,
                  declaration,
                  docs,
                }
              )
            } else {
              return f(...argsToApply)
            }
          }

          return withMeta(curriedFn, {
            name:
              process.NODE_ENV === 'production'
                ? name
                : `${name}(${args
                    .map(arg => (arg === __ ? '__' : show(arg)))
                    .join(', ')})`,
            declaration,
            docs,
          })
        }
      },
      { name, declaration, docs }
    )
  },
  {
    name: 'curry',
    docs: {
      declaration: 'Function -> Number? -> Function',
      docstr: `
        Returns a curried version of a function

        | Example:
        |
        |   const times    = curry((a, b) => a * b);
        |   const timesTwo = times(2);
        |   const mod2     = mod(__, 2); // __ can be used as a placeholder for partial application
        |
        |   times(2, 4) //=> 8
        |   times(2)(4) //=> 8
        |   timesTwo(4) //=> 8
        |
        |   mod2(2)     //=> 0
        |   mod2(3)     //=> 1
`,
    },
  }
)

export const is = withMeta(
  curry((type, obj) => {
    if (type == null) return obj == null
    if (type === Any) return true
    if (obj == null && type === Null) return true
    if (obj == null && type !== Null) return false
    if (obj != null && type === Null) return false
    if (type === Array) {
      return Array.isArray(obj)
    }
    if (type === Object) {
      return obj.constructor === Object
    }
    if (type === Function && typeof obj === 'function') return true
    if (type === obj) return true

    const mapper =
      dispatchMap[showType(type)] || dispatchMap[showType(getType(type))] || {}

    if (typeof mapper.is === 'function') {
      return mapper.is(type, obj)
    }

    if (type.kind === 'OneOf') {
      return type.types.some(is(__, obj))
    }

    if (type.kind === 'Implements') {
      const objType = showType(getType(obj))

      if (dispatchMap[objType]) {
        return type.fns.every(fn => !!dispatchMap[objType][fn])
      } else {
        return type.fns.length === 0
      }

      return type.types.some(is(__, obj))
    }

    if (type.kind === 'ObjectWithPlaceholder') {
      return (
        typeof obj._ === 'function' ||
        Object.keys(type.obj).every(key => {
          return is(type.obj[key], obj[key])
        })
      )
    }

    if (
      type[TypeKey] != null &&
      type[TypeKey] === obj[TypeKey] &&
      obj[KindKey] === CustomType
    )
      return true

    if (
      obj[KindKey] === UnionType &&
      (!type[UnionCase] || type[UnionCase] === obj[UnionCase]) &&
      (obj[TypeKey] === type[TypeKey] || type[TypeKey] === undefined)
    )
      if (type._tag === 'TypedUnion') {
        return (
          obj[TypeKey] === type._name &&
          obj[UnionValues].every((t, i) => is(type._types[i], t))
        )
      } else {
        return true
      }

    if (Array.isArray(type) && Array.isArray(obj) && type.length === 1) {
      return obj.every(is(type[0]))
    }

    if (type.constructor === Object && obj.constructor === Object) {
      return Object.keys(type).every(key => {
        return is(type[key], obj[key])
      })
    }

    if (type[ProtocolSym] && type[ProtocolSym].is) {
      return type[ProtocolSym].is(type, obj)
    }

    return obj.constructor === type
  }, 2),
  {
    name: 'is',
    docs: {
      declaration: 'Any -> Any -> Boolean',
      docstr: 'Checks if a value is of a given type',
    },
  }
)

export const Fun = (name, typeDecl, docstr, fn) => {
  if (process.env.NODE_ENV === 'production')
    return curry(fn, typeDecl.length - 1)

  if (!typeDecl::is(Array)) {
    throw new TypeError(`
Encountered an error during the folowing function definition:

const ${name} = Fun(
  > ,
  ...
)

    - Expected a list of type declarations
`)
  }

  if (!docstr::is(String)) {
    throw new TypeError(`
Encountered an error during the folowing function definition:

const ${name} = Fun(
  [ ${typeDecl.map(showType).join(', ')} ],
  > ,
  (...) => { ... }
)

    - Expected a documentation string
`)
  }

  if (!fn::is(Function)) {
    throw new TypeError(`
Encountered an error during the folowing function definition:

const ${name} = Fun(
  [ ${typeDecl.map(showType).join(', ')} ],
  ${show(docstr)},
  >
)

    - Expected a function expression
`)
  }

  const types = typeDecl.slice(0, fn.length)
  const returnType = typeDecl[fn.length]

  if (typeDecl.length === fn.length) {
    throw new TypeError(`
Encountered an error during the folowing function definition:

const ${name} = Fun(
  [ ${typeDecl.map(showType).join(', ')}, ??? ],
  "${docstr}",
  (...) => { ... }
)

    - Missing return type
`)
  }

  if (typeDecl.length < fn.length) {
    const missing = []

    for (const i = 0; i <= fn.length - typeDecl.length; i++) {
      missing.push(i)
    }

    throw new TypeError(`
Encountered an error while defining function '${name}'

const ${name} = Fun(
  [${typeDecl.map(showType).join(', ')}, ${missing.map(_ => '???').join(', ')}],

  ${docstr},

  (...) => {...}
)

  - Missing multiple argument types
  - Missing return type
`)
  }

  docstr = docstr
    .trim()
    .replace(/\ +/g, ' ')
    .replace(/\n\ /g, ' ')
    .replace(/\|/g, '\n|  ')

  const typedFn = curry(
    withMeta(
      (...args) => {
        const strArgs = args.map(show)
        const errors = args.reduce((acc, arg, i) => {
          if (!arg::is(types[i])) {
            acc[i] = {
              position: i,
              value: arg::show(),
              expected: showType(types[i]),
            }
          }
          return acc
        }, {})

        const errorSigns = strArgs.map((arg, i) => {
          if (errors[i]) {
            return arg
              .split('')
              .map(_ => '^')
              .join('')
          } else {
            return arg
              .split('')
              .map(_ => ' ')
              .join('')
          }
        })

        const invocation = `${name}(${strArgs.join(', ')})\n${name
          .split('')
          .map(_ => ' ')
          .join('')} ${errorSigns.join('  ').trimEnd()}`

        if (Object.keys(errors).length) {
          throw new TypeError(`

Encountered unexpected types in the following function call:

${invocation}
${Object.keys(errors)
  .map(key => errors[key])
  .map(({ value, expected }) =>
    expected === 'Null'
      ? `    - Unexpected argument ${value} has no matching type declaration`
      : `    - Expected ${value} to be of type ${expected}`
  )
  .join('\n')}

`)
        } else {
          const returnValue = fn(...args)

          if (!returnValue::is(returnType)) {
            throw new TypeError(`

Encountered unexpected return type from function ${name} in the following call:

${invocation.trimEnd()}

    - Expected the returned value ${returnValue::show()} to be of type ${showType(
              returnType
            )}

`)
          } else {
            return returnValue
          }
        }
      },
      {
        name,
        declaration: typeDecl,
        docs: {
          declaration: typeDecl.map(showType).join(' -> '),
          docstr,
        },
      }
    ),
    typeDecl.length - 1
  )

  return withMeta(typedFn, {
    name,
    docs: {
      declaration: typeDecl.map(showType).join(' -> '),
      docstr,
    },
  })
}

const getMeta = Fun(
  [String, Any, String],

  'Retrieves the metadata associated with a given key',

  (key, obj) =>
    obj && obj.___meta___
      ? obj.___meta___[key] || ''
      : typeof obj === 'function'
      ? obj.name
        ? `<function: ${obj.name}>`
        : '<function: anonymous>'
      : ''
)

const fnTypeMap = (typeMap => {
  return {
    read: key => typeMap[key],
    write: (key, T) => {
      if (typeMap[key]) {
        if (!typeMap[key].some(t => t === T)) {
          typeMap[key].push(T)
        }
      } else {
        typeMap[key] = [T]
      }
    },
  }
})({})

export const extendType = Fun(
  [Any, Object, Null],

  `Extends a type with polymorphic dispatchers.

  | Example:
  |
  | extendType(Array, {
  |   show: Fun(
  |     [[Implements('show')], String],
  |
  |     "Returns a string representation of an array",
  |
  |     self =>
  |       \`[ \${self::map(show)::join(', ')} ]\`
  |     )
  | })
  |
  | show([1, 2, 3]) // => [ 1, 2, 3 ]
  |`,

  (Type, dispatchers) => {
    if (Type) {
      const typeName = showType(Type)

      if (dispatchMap[typeName]) {
        dispatchMap[typeName] = { ...dispatchMap[typeName], ...dispatchers }
      } else {
        dispatchMap[typeName] = dispatchers
      }

      if (process.env.NODE_ENV !== 'production') {
        Object.keys(dispatchers).forEach(name => {
          fnTypeMap.write(name, Type)
        })
      }
    }
  }
)

export const Dispatch = Fun(
  [String, { arity: Number }, Function],

  `Creates a polymorphic dispatcher function`,

  (name, { arity }) => {
    return withMeta(
      curry((...args) => {
        const typeArg = args[args.length - 1]
        const Type =
          typeArg != null
            ? typeArg[TypeKey] || showType(getType(typeArg))
            : 'Null'

        const match = dispatchMap[Type]

        if (match && match[name]) {
          return match[name](...args)
        } else {
          throw new TypeError(`

Encountered a problem with the following call:

${name}(${args.map(show).join(', ')})

    - Could not find an extension for function ${name} on type ${Type}

`)
        }
      }, arity),
      { name, docs: { declaration: '', docstr: '' } }
    )
  }
)

export const docstr = f => {
  const name = f.___meta___ ? f.___meta___.name || f.name : f.name
  const defaultDocs = { declaration: '', docstr: '' }
  let docs = f.___meta___ ? f.___meta___.docs || defaultDocs : defaultDocs

  if (fnTypeMap.read(name)) {
    const collectedDocs = fnTypeMap
      .read(name)
      .map(T =>
        dispatchMap[showType(T)] && dispatchMap[showType(T)][name].___meta___
          ? dispatchMap[showType(T)][name].___meta___.docs
          : { declaration: '-', docstr: '' }
      )

    const decl = collectedDocs.map(doc => (doc ? doc.declaration || '' : ''))

    docs.declaration = docs.declaration ? [docs.declaration].concat(decl) : decl

    const docstr = collectedDocs.map(doc => (doc ? doc.docstr || '' : ''))

    docs.docstr = docs.docstr ? [docs.docstr].concat(docstr) : docstr
  }

  if (docs.declaration::is(Array)) {
    return `
${docs.declaration
  .map((decl, i) => `${name} : ${decl}\n\n${docs.docstr[i]}`)
  .join('\n\n')}
`
  } else {
    return `${docs.declaration}\n\n${docs.docstr}`
  }
}

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
export const Type = (name, spec) => {
  const specKeys = Object.keys(spec)
  const constructor = curry((...values) => {
    const data = specKeys.reduce(
      (acc, key, i) => ((acc[key] = values[i]), acc),
      {}
    )

    const errors = specKeys.reduce((acc, key, i) => {
      const val = values[i]
      const T = spec[key]

      return is(T, val) ? acc : acc.concat({ key, type: T, val })
    }, [])

    if (errors.length) {
      throw new TypeError(`Invalid types passed into the ${name}(${showType(
        spec
      )}) constructor:
${errors
  .map(
    ({ key, type, val }) =>
      `  * Field: ${key} - expected value of type ${showType(
        type
      )} but got a value of type ${
        Array.isArray(val) ? showType([val[0]]) : showType(val)
      } (${show(val)})`
  )
  .join('\n')}
`)
    }

    const type = {
      [TypeKey]: name,
      [TypeKeys]: specKeys,
      [KindKey]: CustomType,
      constructor,
      ...data,
    }

    return type
  }, specKeys.length)

  constructor[KindKey] = CustomType
  constructor[TypeKey] = name

  const oneOfKeys = OneOf(specKeys)
  const keyTypes =
    process.env.NODE_ENV === 'production'
      ? []
      : Object.values(
          specKeys.reduce(
            (acc, key) => ({ ...acc, [showType(spec[key])]: spec[key] }),
            {}
          )
        )

  extendType(constructor, {
    count: Fun(
      [constructor, Number],

      `Returns the number of keys defined on ${showType(constructor)}`,

      type => type[TypeKeys].length
    ),

    get: Fun(
      [
        specKeys.length === 1 ? specKeys[0] : OneOf(specKeys),

        constructor,

        Maybe(keyTypes.length === 1 ? keyTypes[0] : OneOf(keyTypes)),
      ],

      `Returns the value associated with the key on ${showType(
        constructor
      )} wrapped in a maybe`,

      (key, type) => maybe(type[key])
    ),

    assoc: Fun(
      [
        specKeys.length === 1 ? specKeys[0] : OneOf(specKeys),
        keyTypes.length === 1 ? keyTypes[0] : OneOf(keyTypes),
        constructor,
        constructor,
      ],

      `Associates a new value with a given key`,

      (key, val, type) =>
        constructor(...specKeys::map(k => (k === key ? val : type[k])))
    ),

    keys: Fun(
      [constructor, [String]],

      `Returns an array of the keys defined on ${showType(constructor)}`,

      type => type[TypeKeys]
    ),

    vals: Fun(
      [constructor, [keyTypes.length === 1 ? keyTypes[0] : OneOf(keyTypes)]],

      `Returns an array of the values defined on ${showType(constructor)}`,

      type => type[TypeKeys].map(key => type[key])
    ),
  })

  return constructor
}

// -- Union

export const Union = (name, spec) => {
  const specKeys = Object.keys(spec)

  function _Union(...types) {
    if (!(this instanceof _Union)) {
      return new _Union(...types)
    }
    this._name = name
    this._tag = 'TypedUnion'
    this._types = types
  }

  _Union[TypeKey] = name
  _Union[UnionCases] = specKeys
  _Union[KindKey] = UnionType

  const specType = specKeys.reduce(
    (acc, key) => ({ ...acc, [key]: Function }),
    {}
  )

  return specKeys.reduce((acc, key, i) => {
    const _case = curry((...vals) => {
      const hasErrors = spec[key].some((type, i) => !is(type, vals[i]))

      if (hasErrors) {
        throw new TypeError(
          `Type mismatch: Type ${name}.${key}(${spec[key]
            .map(showType)
            .join(
              ', '
            )}) was invoked with incompatible types: ${name}.${key}(${vals
            .map(show)
            .join(', ')})`
        )
      }

      return {
        [TypeKey]: name,
        [UnionCase]: key,
        [KindKey]: UnionType,
        [UnionCases]: specKeys,
        [UnionValues]: vals,
        constructor: _Union,
      }
    }, spec[key].length)

    _case[TypeKey] = name
    _case[KindKey] = UnionType
    _case[UnionCase] = key

    acc[key] = _case

    extendType(_Union, {
      caseOf: Fun(
        [Array, _Union, Any],

        `Adds pattern matching capabilities to ${name}`,

        (pattern, value) => {
          let match, wildcard

          for (const [matcher, fn] of pattern) {
            if (matcher === value[UnionCase]) {
              match = fn(...value[UnionValues])
              break
            }
            if (matcher === __) {
              match = fn(...value[UnionValues])
            }
          }

          if (process.env.NODE_ENV !== 'production') {
            const hasCases = value[UnionCases].every(_case =>
              pattern.some(([matcher]) => matcher === _case || matcher === __)
            )
            if (!hasCases) {
              patternError(
                value,
                pattern,
                `Missing matcher for the following cases: ${value[
                  UnionCases
                ].filter(
                  _case => !pattern.some(([matcher]) => matcher === _case)
                ).join(', ')}`
              )
            }
          }

          return match
        }
      ),
    })

    return acc
  }, _Union)
}

// -- Core Types

export const Maybe = Union({
  Some: [Any],
  None: [],
})

Maybe.get = Fun(
  'Maybe.get',

  [Any, Maybe, Any],

  `Extracts the value out of a Maybe if it exists,
  returns the fallback otherwise.`,

  (fallback, maybe) =>
    maybe::caseOf({
      Some: x => x,
      None: () => fallback,
    })
)

export const maybe = Fun(
  [Any, Maybe(Any)],

  'Wraps an optional value in a Maybe',

  x => (x == null ? Maybe.None() : Maybe.Some(x))
)

export const Result = Union({
  Ok: [Any],
  Err: [Any],
})

Result.get = Fun(
  'Result.get',

  [Result, Any],

  'Returns the value wrapped inside a result',

  result =>
    result::caseOf({
      Ok: x => x,
      Err: x => x,
    })
)

export const result = Fun(
  [Any, Any, Result(Any)],

  'Returns a Result.Ok if ok value is non null Result.Err with the error value otherwise',

  (ok, err) => (ok == null ? Result.Err(err) : Result.Ok(ok))
)

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
export const Task = Type({ fork: Function })

Task.fail = Fun(
  'Task.fail',
  [Any, Task],

  'Creates a Task that will always fail',

  x => Task((fail, _) => fail(x))
)

Task.succeed = Fun(
  'Task.succeed',
  [Any, Task],

  'Creates a Task that will always succeed',

  x => Task((_, succeed) => succeed(x))
)

/* Task.none
 *
 * A task that does nothing
 */
Task.none = Task((_f, _s) => {})

Task.perform = Fun(
  'Task.perform',
  [Task, Function, Function, Task],

  'Transforms a regular task into one that always succeeds',

  (task, error, success) =>
    Task((_, succeed) =>
      task.fork(
        err => succeed(err != null ? error(err) : error()),
        val => succeed(val != null ? success(val) : success())
      )
    )
)

/* Task.try(task: Task, success: Function) => Task
 *
 * Like Task.perform but ignores the failure case
 *
 */
Task.try = Fun(
  'Task.try',
  [Task, Function, Task],

  'Like task.perform but ignores the failure case',

  (task, success) =>
    Task((_, succeed) =>
      task.fork(
        err => {},
        val => succeed(val != null ? success(val) : success())
      )
    )
)

Task.toPromise = Fun(
  'Task.toPromise',
  [Task, Promise],

  'Converts a task into a promise',

  t => new Promise((succeed, fail) => t.fork(fail, succeed))
)

Task.fromPromise = Fun(
  'Task.fromPromise',
  [Promise, Task],

  'Converts a promise into a task',

  p =>
    Task((fail, succeed) => {
      p.then(succeed).catch(fail)
    })
)

Task.parallel = Fun(
  'Task.parallel',
  [[Task], Task],

  `Runs a list of tasks in parallel and returns a new task that resolves to a list of values`,

  tasks =>
    Task((fail, succeed) =>
      Promise.all(IFunctor.map(tasks, Task.toPromise)).then(succeed).catch(fail)
    )
)

const Num = Type({ predicate: Function })
const Str = Type({ predicate: Function })
const Arr = Type({ predicate: Function })
const Obj = Type({ predicate: Function })

// -- Dispatch methods

export const caseOf = Dispatch({ arity: 2 })
export const clone = Dispatch({ arity: 1 })
export const shallowClone = Dispatch({ arity: 1 })
export const empty = Dispatch({ arity: 1 })
export const append = Dispatch({ arity: 2 })
export const count = Dispatch({ arity: 1 })
export const get = Dispatch({ arity: 2 })
export const first = Dispatch({ arity: 1 })
export const rest = Dispatch({ arity: 1 })
export const foldlKV = Dispatch({ arity: 3 })
export const foldrKV = Dispatch({ arity: 3 })
export const foldl = Dispatch({ arity: 3 })
export const foldr = Dispatch({ arity: 3 })
export const map = Dispatch({ arity: 2 })
export const bimap = Dispatch({ arity: 3 })
export const assoc = Dispatch({ arity: 3 })
export const dissoc = Dispatch({ arity: 2 })
export const pure = Dispatch({ arity: 2 })
export const flatten = Dispatch({ arity: 1 })
export const ap = Dispatch({ arity: 2 })
export const keys = Dispatch({ arity: 1 })
export const join = Dispatch({ arity: 2 })
export const slice = Dispatch({ arity: 3 })

const Pattern = T =>
  Arr(
    withMeta(
      x =>
        x::is(Array) &&
        x::count() === 2 &&
        x[0]::is(OneOf([Function, T, '_', '__', __])) &&
        x[1]::is(Function)
    ),
    { name: 'Pattern' }
  )

const patternError = (value, pattern, hint = '') => {
  throw new TypeError(`
Found a non-exhaustive pattern in the following expression:

${show(value)}::caseOf({
  ${pattern
    .map(([pattern, func]) => `[${show(pattern)}]: (...) => { ... }`)
    .join(',\n  ')}
})${hint ? `\n\n  - ${hint}` : ''}
  `)
}

// -- Core Extensions

extendType(Num, {
  is: curry((type, num) => {
    if (type === Num) {
      return num::is(Number)
    } else {
      return num::is(Number) && type.predicate(num)
    }
  }),

  showType: t => (t === Num ? 'Num' : `Num(${getMeta('name', t.predicate)})`),
})

extendType(Str, {
  is: curry((type, str) => {
    if (type === Str) {
      return str::is(String)
    } else {
      return str::is(String) && type.predicate(str)
    }
  }),

  showType: t => (t === Str ? 'Str' : `Str(${getMeta('name', t.predicate)})`),
})

extendType(Arr, {
  is: curry((type, xs) => {
    if (type === Arr) {
      return xs::is(Array)
    } else {
      return xs::is(Array) && type.predicate(xs)
    }
  }),

  showType: t => (t === Arr ? 'Arr' : `Arr(${getMeta('name', t.predicate)})`),
})

extendType(Obj, {
  is: curry((type, obj) => {
    if (type === Obj) {
      return obj::is(Object)
    } else {
      return obj::is(Object) && type.predicate(obj)
    }
  }),

  showType: t => (t === Obj ? 'Obj' : `Obj(${getMeta('name', t.predicate)})`),
})

extendType(Number, {
  clone: Fun(
    [Num, Num],

    'Returns the same number it was called with',

    num => num
  ),

  shallowClone: clone,

  caseOf: Fun(
    [Arr, Num, Any],

    `Allows for pattern matching on numbers.

    | Example:
    |
    | 2::caseOf({
    |  1: num => 'number one',
    |  [lt(4)]: num => 'less than four but not 1',
    |  [__]: num => 'every other number'
    | })
    `,

    (patterns, num) => {
      let match

      for (let [matcher, fn] of patterns) {
        if (num === matcher) {
          match = fn(num)
          break
        }

        if (typeof matcher === 'function') {
          if (matcher(num)) {
            match = fn(num)
            break
          }
        }

        if (matcher === __) {
          match = fn(num)
          break
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        if (!patterns.some(([key]) => key === __)) {
          patternError(
            num,
            patterns,
            "There are multiple strings that won't be caught by this pattern, add a wildcard or predicate matcher."
          )
        }
      }

      return match
    }
  ),
})

extendType(Boolean, {
  clone: Fun(
    [Boolean, Boolean],

    'Returns the boolean it was called with',

    bool => bool
  ),

  shallowClone: clone,

  caseOf: Fun(
    [Arr, Boolean, Any],

    `Allows for pattern matching on booleans.
    Only matches against literal values true, false and __.

    | Example:
    |
    | true::caseOf({
    |  [true]: num => 'its true',
    |  [false]: num => 'its false',
    | })
    `,

    (patterns, bool) => {
      let match

      for (let [matcher, fn] of patterns) {
        if (bool === matcher) {
          match = fn(bool)
          break
        }

        if (matcher === __) {
          match = fn(bool)
          break
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        if (!patterns.some(([key]) => key === __)) {
          if (
            patterns.length < 2 ||
            !(
              patterns.some(([key]) => key === true) &&
              patterns.some(([key]) => key === false)
            )
          ) {
            patternError(
              bool,
              patterns,
              "There are multiple strings that won't be caught by this pattern, add a wildcard or predicate matcher."
            )
          }
        }
      }

      return match
    }
  ),
})

extendType(RegExp, {
  clone: Fun(
    [RegExp, RegExp],

    'It returns the same regular expression',

    regex => regex
  ),

  shallowClone: clone,

  empty: Fun(
    [RegExp, RegExp],

    'Returns an empty instance of RegExp',

    _ => new RegExp()
  ),

  append: Fun(
    [RegExp, RegExp, RegExp],

    'Concatenates two regular expresions',

    (r1, r2) => {
      const modifiers = `${r1.global || r2.global ? 'g' : ''}${
        r1.ignoreCase || r2.ignoreCase ? 'i' : ''
      }${r1.multiline || r2.multiline ? 'm' : ''}`
      return new RegExp(r2.source + r1.source, modifiers)
    }
  ),
})

extendType(Date, {
  clone: Fun(
    [Date, Date],

    'Returns a cloned date',

    date => new Date(date)
  ),

  shallowClone: clone,
})

extendType(Array, {
  clone: Fun(
    [Arr, Arr],

    'Returns a deeply cloned array',

    xs => xs.map(x => clone(x))
  ),

  shallowClone: Fun(
    [Arr, Arr],

    'Returns a shallowly cloned array',

    xs => xs.slice()
  ),

  count: Fun(
    [Arr, Num],

    'Returns the size of an array',

    xs => xs.length
  ),

  get: Fun(
    [OneOf([Str, Num]), Arr, Maybe],

    `Returns a Maybe containing the value at the specified index if it exists or None otherwise

    | Example:
    |
    | get(1, [1, 2, 3]) //=> Maybe.Some(2)
    | get(8, [1, 2, 3]) //=> Maybe.None()
    `,

    (index, xs) => maybe(xs[index])
  ),

  first: Fun(
    [Array, Maybe(Any)],

    'Returns the first element of the array wrapped in a Maybe',

    xs => xs::get(0)
  ),

  rest: Fun(
    [Array, Array],

    'Returns a new array containing all elements of the original except the first',

    xs => xs.slice(1)
  ),

  foldlKV: Fun(
    [Function, Any, Arr, Any],

    `Transforms an array by running each element, index and an accumulator
    through a function

    | Example:
    |
    | [1, 2, 3]::foldlKV((key, val, acc) => acc + key + val, 0)
    | // => 9
    `,

    (f, acc, xs) => xs.reduce((acc, val, key) => f(key, val, acc), acc)
  ),

  foldl: Fun(
    [Function, Any, Arr, Any],

    `Transforms an array by running each element and an accumulator
    through a function

    | Example:
    |
    | const sum = foldl((val, acc) => acc + val, 0)
    | sum([1, 2, 3]) // => 6
    |
    | const copy = foldl(append, [])
    | copy([1, 2, 3]) //=> [1, 2, 3]
    `,

    (f, acc, xs) => xs::foldlKV((_, val, acc) => f(val, acc), acc)
  ),

  foldrKV: Fun(
    [Function, Any, Arr, Any],

    `Same as foldlKV but iterates through the array from the right`,

    (f, acc, xs) => xs.reduceRight((acc, val, key) => f(key, val, acc), acc)
  ),

  foldr: Fun(
    [Function, Any, Arr, Any],

    `Same as foldl but starts from the right

    | Example:
    |
    | const reverse = foldr(append, [])
    | reverse([1, 2, 3]) // => [3, 2, 1]
    `,

    (f, acc, xs) => xs::foldrKV((_, val, acc) => f(val, acc), acc)
  ),

  assoc: Fun(
    [OneOf([Num, Str]), Any, Arr, Arr],

    `Associates an existing index with a new value`,

    (key, value, xs) => {
      const cloned = clone(xs)
      if (key > xs.length) return cloned
      cloned[key] = value
      return cloned
    }
  ),

  dissoc: Fun(
    [OneOf([Str, Num]), Arr, Arr],

    'Removes a given index from an array',

    (key, xs) => xs.filter((item, idx) => idx !== key)
  ),

  map: Fun(
    [Function, Arr, Arr],

    `Produces a new array by running each element through a
    transformation function

    | Example:
    |
    | ['a', 'b', 'c']::map(append('!')) //=> ['a!', 'b!', 'c!']
    `,

    (f, xs) => xs.map(x => f(x))
  ),

  empty: Fun(
    [Arr, Arr(withMeta(xs => xs::count() === 0, { name: 'isEmpty' }))],

    'Returns an empty array',

    xs => []
  ),

  append: Fun(
    [Any, Arr, Arr],

    'Appends an element to the end of an array',

    (x, xs) => xs.concat(x::is(Array) ? [x] : x)
  ),

  pure: Fun(
    [Any, Arr, [Any]],

    'Takes a value and wrapps it in an array',

    (val, _) => [val]
  ),

  flatten: Fun(
    [Arr, Arr],

    'It flattens a nested array',

    xs =>
      xs.flat::is(Function)
        ? xs.flat()
        : xs.reduce((acc, x) => acc.concat(x), [])
  ),

  ap: Fun(
    [Arr, [Function], Arr],

    `Applies a list of values to a list of functions.

    | Example:
    | [add(1), add(2)]::ap([3, 4])
    | //=> [
    |   /* 1 + 3 */ 4, /* 1 + 4 */ 5,
    |   /* 2 + 3 */ 5, /* 2 + 4 */ 6
    | ]
    `,

    (vals, fns) => fns::map(f => vals::map(f))::flatten()
  ),

  keys: Fun(
    [Arr, [Num]],

    'Returns a list of all the indices',

    xs => xs.map((_, i) => i)
  ),

  join: Fun(
    [Str, [OneOf([Str, Num])], Str],

    'Returns a string of each element joined by a separator',

    (sep, xs) => xs.join(', ')
  ),

  slice: Fun(
    [Num, Num, Arr, Arr],

    'Returns a new array with only the values between start and end',

    (start, end, xs) => xs.slice(start, end)
  ),

  caseOf: Fun(
    [Arr, Arr, Any],

    `Allows for pattern matching on arrays.

    | Example:
    |
    | [1, 2, [3, 4]]::caseOf({
    |   [[Number]]: xs => 'array with a single number!',
    |   [x => x.length === 10]: xs => '10 elements!',
    |   [[Number, Number, [Number, Number]]]: xs => 'Jackpot!'
    |   [[String, Number, Spread(Number)]]: xs => '[Str, Num, ...Str]'
    |   [__]: xs => 'every other array'
    | }) // => 'Jackpot!'
    `,

    (patterns, xs) => {
      let match

      const matchPattern = (matcher, value) => {
        if (Array.isArray(matcher) && Array.isArray(value)) {
          const last = matcher[matcher.length - 1]

          if (last && last.kind === 'Spread') {
            matcher = matcher.slice(0, matcher.length - 1)
            return (
              matcher.every((item, i) => matchPattern(item, value[i])) &&
              value.slice(matcher.length).every(v => v::is(last.type))
            )
          } else {
            return (
              matcher.length === value.length &&
              value.every((item, i) => matchPattern(matcher[i], item))
            )
          }
        }

        if (matcher::is(Object) && value::is(Object)) {
          return Object.keys(matcher).every(key => {
            return matchPattern(value[key], matcher[key])
          })
        }

        if (value::is(matcher)) {
          return true
        }

        if (value === matcher) {
          return true
        }

        if (
          matcher instanceof RegExp &&
          value::is(String) &&
          string.match(matcher)
        ) {
          return true
        }

        if (typeof matcher === 'function') {
          if (matcher(value)) {
            return true
          }
        }

        return false
      }

      for (let [matcher, fn] of patterns) {
        if (matchPattern(matcher, xs)) {
          match = fn(xs)
          break
        }
        if (matcher === __) {
          match = fn(xs)
          break
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        if (!patterns.some(([matcher]) => matcher === __)) {
          patternError(
            xs,
            patterns,
            'Wildcard matcher is required when pattern matching on arrays'
          )
        }
      }

      return match
    }
  ),
})

extendType(String, {
  clone: Fun(
    [Str, Str],

    'Returns a cloned string',

    str => str
  ),

  shallowClone: clone,

  count: Fun(
    [Str, Num],

    'Returns the size of a string',

    str => str.length
  ),

  get: Fun(
    [OneOf([Str, Num]), String, Maybe],

    `Returns a Maybe containing the character at the specified index if it exists or None otherwise

    | Example:
    |
    | get(1, "bar") //=> Maybe.Some('a')
    | get(8, "bar") //=> Maybe.None()
    `,

    (index, str) => maybe(str[index])
  ),

  first: Fun(
    [String, Maybe(String)],

    'Returns the first character in a string',

    str => str::get(0)
  ),

  rest: Fun(
    [String, String],

    'Returns the string with the first character removed',

    str => str.slice(1)
  ),

  foldlKV: Fun(
    [Function, Any, Str, Any],

    `Transforms a string by running each element, index and an accumulator
    through a function

    | Example:
    |
    | 'abc'::foldlKV((k, v, acc) => acc::append([k, v]), [])
    | // => [[0, 'a'], [1, 'b'], [2, 'c']]
    `,

    (f, acc, str) => str.split('')::foldlKV((k, v, acc) => f(k, v, acc), acc)
  ),

  foldl: Fun(
    [Function, Any, Str, Any],

    `Transforms a string by running each element and an accumulator
    through a function

    | Example:
    |
    | 'abc'::foldl(append, [])
    | // => ['a', 'b', 'c']]
    `,

    (f, acc, str) => str.split('')::foldl((val, acc) => f(val, acc), acc)
  ),

  foldrKV: Fun(
    [Function, Any, Str, Any],

    `Same as foldlKV but iterates through the string from the right`,

    (f, acc, xs) => xs.split('')::foldrKV((k, v, acc) => f(k, v, acc), acc)
  ),

  foldr: Fun(
    [Function, Any, Str, Any],

    `Same as foldl but starts from the right

    | Example:
    |
    | 'abc'::foldr(append, [])
    | // => ['c', 'b', 'a']]
    `,

    (f, acc, str) => str.split('')::foldr((val, acc) => f(val, acc), acc)
  ),

  assoc: Fun(
    [OneOf([Num, Str]), Str, Str, Str],

    `Associates an existing index with a new value`,

    (key, value, str) => {
      return str.split('')::assoc(key, value).join('')
    }
  ),

  dissoc: Fun(
    [OneOf([Str, Num]), Str, Str],

    'Removes a given index from a string',

    (key, xs) => xs.split('')::dissoc(key).join('')
  ),

  map: Fun(
    [Function, Str, Str],

    `Produces a new string by running each element through a
    transformation function

    | Example:
    |
    | 'abc'::map(x => x.toUpperCase()) //=> 'ABC'
    `,

    (f, xs) =>
      xs
        .split('')
        ::map(x => f(x))
        .join('')
  ),

  empty: Fun(
    [Str, Str],

    'Returns an empty string',

    _ => ''
  ),

  append: Fun(
    [Str, Str, Str],

    'Appends a character to the end of a string',

    (char, str) => str + char
  ),

  keys: Fun(
    [Str, [Num]],

    'Returns a list of all the indices',

    xs => xs.split('').map((_, i) => i)
  ),

  join: Fun(
    [String, String, String],

    'Joins each character by a separator',

    (sep, str) => str::split('')::join(sep)
  ),

  slice: Fun(
    [Number, Number, String, String],

    'Returns a new string with only the characters betweed start and end',

    (start, end, str) => str.slice(start, end)
  ),

  caseOf: Fun(
    [Arr, Str, Any],

    `Allows for pattern matching on numbers.

    | Example:
    |
    | "quux"::caseOf({
    |  "foo": str => 'foo!',
    |  [x => x.match(/bar/)]: str => 'bar!',
    |  [/quux/]: str => 'quux!'
    |  [__]: str => 'every other string'
    | }) // => 'quux!'
    `,

    (patterns, str) => {
      let match

      for (let [matcher, fn] of patterns) {
        if (str === matcher) {
          match = fn(str)
          break
        }

        if (typeof matcher === 'function') {
          if (matcher(str)) {
            match = fn(str)
            break
          }
        }

        if (matcher instanceof RegExp) {
          if (str.match(matcher)) {
            match = fn(str)
            break
          }
        }

        if (matcher === __) {
          match = fn(str)
          break
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        if (
          !patterns.some(([matcher]) => matcher === __) &&
          !patterns.some(([matcher]) => typeof matcher === 'function')
        ) {
          patternError(
            str,
            patterns,
            "There are multiple strings that won't be caught by this pattern, add a wildcard or predicate matcher."
          )
        }
      }

      if (!match) {
        patternError(
          str,
          patterns,
          "There are multiple strings that won't be caught by this pattern, add a wildcard or predicate matcher."
        )
      }

      return match
    }
  ),
})

extendType(Object, {
  clone: Fun(
    [Obj, Obj],

    'Returns a cloned object',

    obj =>
      Object.keys(obj).reduce(
        (acc, key) => ({ ...acc, [key]: clone(obj[key]) }),
        {}
      )
  ),

  shallowClone: Fun(
    [Obj, Obj],

    'Returns a shallowly cloned object',

    obj => ({ ...obj })
  ),

  count: Fun(
    [Obj, Num],

    'Returns the size of a string',

    obj => Object.keys(obj).length
  ),

  get: Fun(
    [OneOf([Str, Num]), Obj, Maybe],

    `Returns a Maybe containing the value associated with the key if it
    exists or None otherwise

    | Example:
    |
    | get('a', { a: 'A', b: 'B' }) //=> Maybe.Some('A')
    | get('c', { a: 'A', b: 'B' }) //=> Maybe.None()
    `,

    (key, obj) => maybe(obj[key])
  ),

  first: Fun(
    [Object, Maybe(Any)],

    'Returns the first value of an Object',

    obj => obj::keys()::get(0)::map(get(__, obj))::flatten()
  ),

  rest: Fun(
    [Object, Object],

    'Returns the object with the first key removed',

    obj =>
      obj
        ::keys()
        .slice(1)
        ::foldl((key, acc) => acc::assoc(key, obj[key]), {})
  ),

  foldlKV: Fun(
    [Function, Any, Obj, Any],

    `Transforms an object by running each element, key and an accumulator
    through a function

    | Example:
    |
    | { a: 'A', b: 'B', c: 'C' }::foldlKV((key, kvp, acc) => acc::append(kvp), [])
    | // => [['a', 'A'], ['b', 'B'], ['c', 'C']]
    `,

    (f, acc, obj) =>
      Object.keys(obj).reduce((acc, key) => f(key, [key, obj[key]], acc), acc)
  ),

  foldl: Fun(
    [Function, Any, Obj, Any],

    `Transforms an object by running each element and an accumulator
    through a function

    | Example:
    |
    | const sum = foldl(([key, val], acc) => acc + val, 0)
    | sum({ a: 1, b: 2, c: 3 }) // => 6
    `,

    (f, acc, obj) => obj::foldlKV((k, kvp, acc) => f(kvp, acc), acc)
  ),

  foldrKV: Fun(
    [Function, Any, Obj, Any],

    `Same as foldlKV but starts from the right`,

    (f, acc, obj) =>
      Object.keys(obj).reduceRight(
        (acc, key) => f(key, [key, obj[key]], acc),
        acc
      )
  ),

  foldr: Fun(
    [Function, Any, Obj, Any],

    `Same as foldl but starting from the right`,

    (f, acc, obj) => obj::foldrKV((_, kvp, acc) => f(kvp, acc), acc)
  ),

  assoc: Fun(
    [OneOf([Num, Str]), Any, Obj, Obj],

    `Associates a key with a value`,

    (key, value, obj) => {
      return { ...obj, [key]: value }
    }
  ),

  dissoc: Fun(
    [OneOf([String, Number]), Object, Object],

    'Removes a given key from an object',

    (key, obj) =>
      obj::foldl(([k, v], acc) => (k === key ? acc : acc::append([k, v])), {})
  ),

  map: Fun(
    [Function, Obj, Obj],

    `Produces a new object by running each value through a
    transformation function

    | Example:
    |
    | { a: 1, b: 2, c: 3 }::map([key, val] => x + 1)
    | //=> { a: 2, b: 3, c: 4 }
    `,

    (f, obj) => obj::foldl(([k, v], acc) => acc::append([k, f(v)]), {})
  ),

  empty: Fun(
    [Obj, Obj(withMeta(x => Object.keys(x).length === 0, { name: 'empty' }))],

    'Returns an empty object',

    _ => ({})
  ),

  append: Fun(
    [
      Arr(
        withMeta(x => x.length === 2 && x[0]::is(OneOf([Str, Num])), {
          name: 'KeyValuePair',
        })
      ),
      Obj,
      Obj,
    ],

    'Appends a key/value pair to the an object',

    (kvp, obj) => {
      const [k, v] = kvp
      return obj::assoc(k, v)
    }
  ),

  keys: Fun(
    [Obj, [Str]],

    'Returns a list of all the objects keys',

    Object.keys
  ),

  caseOf: Fun(
    [Arr, Obj, Any],

    `Allows for pattern matching on objects.

    | Example:
    |
    | { a: 123, b: 'foo' }::caseOf({
    |   [{ a: Number, b: 'foo' }]: xs => '{ a: Number, b: 'foo' }',
    |   [{ d: Array }]: xs => '{ d: Array }',
    |   [__]: xs => 'every other object'
    | }) // => '{ a: Number, b: 'foo' }'
    `,

    (patterns, obj) => {
      let match

      const matchPattern = (matcher, value) => {
        if (typeof matcher === 'function') {
          if (value !== undefined && matcher(value) === true) {
            return true
          }
        }

        if (value::is(matcher)) {
          return true
        }

        if (value === matcher) {
          return true
        }

        if (
          matcher instanceof RegExp &&
          value::is(String) &&
          string.match(matcher)
        ) {
          return true
        }

        if (Array.isArray(matcher) && Array.isArray(value)) {
          const last = matcher[matcher.length - 1]

          if (last && last.kind === 'Spread') {
            matcher = matcher.slice(0, matcher.length - 1)
            return (
              matcher.every((item, i) => matchPattern(item, value[i])) &&
              value.slice(matcher.length).every(v => v::is(last.type))
            )
          } else {
            return (
              matcher.length === value.length &&
              value.every((item, i) => matchPattern(matcher[i], item))
            )
          }
        }
        if (matcher::is(Object) && value::is(Object)) {
          return Object.keys(matcher).every(key => {
            return matchPattern(matcher[key], value[key])
          })
        }

        return false
      }

      for (let [matcher, fn] of patterns) {
        if (matchPattern(matcher, obj)) {
          match = fn(obj)
          break
        }
        if (matcher === __) {
          match = fn(obj)
          break
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        if (!patterns.some(([matcher]) => matcher === __)) {
          patternError(
            obj,
            patterns,
            'Wildcard matcher is required when pattern matching on objects'
          )
        }
      }

      return match
    }
  ),
})

extendType(Maybe, {
  clone: Fun(
    [Maybe(Implements('clone')), Maybe(Implements('clone'))],

    'Clones the wrapped value',

    m => m::map(clone)
  ),

  shallowClone: Fun(
    [Maybe(Implements('shallowClone')), Maybe(Implements('shallowClone'))],

    'Clones the wrapped value',

    m => m::map(shallowClone)
  ),

  empty: Fun(
    [Maybe, Maybe.None],

    'Always returns None',

    _ => Maybe.None()
  ),

  append: Fun(
    [Maybe(Any), Maybe(Implements('append')), Maybe(Implements('append'))],

    'Appends the content of one maybe to the content of another',

    (mb, ma) =>
      ma::caseOf({
        Some: a =>
          mb::caseOf({
            Some: b => Maybe.Some(a::append(b)),
            None: () => ma,
          }),
        None: () => mb,
      })
  ),

  map: Fun(
    [Function, Maybe, Maybe],

    'Maps a function over the value contained in the maybe',

    (f, m) =>
      m::caseOf({
        Some: x => Maybe.Some(f(x)),
        None: () => Maybe.None(),
      })
  ),

  pure: Fun(
    [Any, Maybe, Maybe.Some],

    'Returns a Some containing the passed in value',

    (x, _) => Maybe.Some(x)
  ),

  flatten: Fun(
    [Maybe(Maybe(Any)), Maybe(Any)],

    'Flattens a nested maybe',

    m => m::caseOf({ Some: id, None: () => Maybe.None() })
  ),

  ap: Fun(
    [Maybe(Any), Maybe(Function), Maybe(Any)],

    'Applies a value wrapped in a Maybe.Some to a function wrapped in Maybe.Some',

    (mb, ma) =>
      ma::caseOf({
        Some: map(__, mb),
        None: Maybe.None,
      })
  ),

  foldl: Fun(
    [Function, Any, Maybe, Any],

    "Transforms a Maybe by running it's value and an accumulator through a function",

    (f, acc, ma) =>
      ma::caseOf({
        Some: x => f(x, acc),
        None: () => acc,
      })
  ),

  foldr: Fun(
    [Function, Any, Maybe, Any],

    'Same as foldl',

    (f, acc, ma) =>
      ma::caseOf({
        Some: x => f(x, acc),
        None: () => acc,
      })
  ),
})

extendType(Result, {
  clone: Fun(
    [Result(Implements('clone')), Result(Implements('clone'))],

    'Clones the wrapped value',

    m => m::map(clone)
  ),

  shallowClone: Fun(
    [Result(Implements('shallowClone')), Result(Implements('shallowClone'))],

    'Clones the wrapped value',

    m => m::map(shallowClone)
  ),

  empty: Fun(
    [Result(Implements('empty')), Result(Implements('empty'))],

    'Returns a new result with the empty content',

    res =>
      res::caseOf({
        Ok: val => Result.Ok(empty(val)),
        Err: err => Result.Err(empty(err)),
      })
  ),

  append: Fun(
    [
      Result(Implements('append')),
      Result(Implements('append')),
      Result(Implements('append')),
    ],

    'Appends the content of one result to the content of another',

    (mb, ma) =>
      ma::caseOf({
        Ok: x =>
          mb::caseOf({
            Ok: xs => Result.Ok(x::append(xs)),
            Err: () => ma,
          }),
        Err: x =>
          mb::caseOf({
            Ok: () => mb,
            Err: xs => Result.Err(x::append(xs)),
          }),
      })
  ),

  map: Fun(
    [Function, Result, Result],

    'Maps a function over the value contained in a Result.Ok',

    (f, m) =>
      m::caseOf({
        Ok: x => Result.Ok(f(x)),
        Err: Result.Err,
      })
  ),

  bimap: Fun(
    [Function, Function, Result, Result],

    'Like map but also takes a function to map over the error case',

    (err, ok, ma) =>
      ma::caseOf({
        Ok: x => Result.Ok(ok(x)),
        Err: x => Result.Err(err(x)),
      })
  ),

  pure: Fun(
    [Any, Result, Result.Ok],

    'Returns a Some containing the passed in value',

    (x, _) => Result.Ok(x)
  ),

  flatten: Fun(
    [OneOf([Result(Result(Any)), Result.Err]), Result(Any)],

    'Flattens a nested result',

    m => m::caseOf({ Ok: id, Err: err => Result.Err(err) })
  ),

  ap: Fun(
    [Result(Any), OneOf([Result(Function), Result.Err]), Result(Any)],

    'Applies a value wrapped in a Result.Ok to a function wrapped in Result.Ok',

    (mb, ma) =>
      ma::caseOf({
        Ok: map(__, mb),
        Err: Result.Err,
      })
  ),

  foldl: Fun(
    [Function, Any, Result, Any],

    'Transforms a Result by running its value and an accumulator through a function',

    (f, acc, ma) =>
      ma::caseOf({
        Ok: x => f(x, acc),
        Err: _ => acc,
      })
  ),

  foldr: Fun(
    [Function, Any, Result, Any],

    'Same as foldl',

    (f, acc, ma) =>
      ma::caseOf({
        Ok: x => f(x, acc),
        Err: _ => acc,
      })
  ),
})

extendType(Task, {
  clone: Fun(
    [Task, Task],

    'Returns a new task with the content cloned',

    t => map(clone, t)
  ),

  shallowClone: Fun(
    [Task, Task],

    'Returns a new task with the content shallowly cloned',

    t => map(shallowClone, t)
  ),

  map: Fun(
    [Function, Task, Task],

    'Maps a function over the contents of a Task',

    (f, t) => Task((fail, succeed) => t.fork(fail, val => succeed(f(val))))
  ),

  pure: Fun(
    [Any, Task, Task],

    'Returns a task that succeeds with the given value',

    (val, _) => Task.succeed(val)
  ),

  flatten: Fun(
    [Task, Task],

    'Flattens a nested task',

    t => Task((fail, succeed) => t.fork(fail, t2 => t2.fork(fail, succeed)))
  ),

  ap: Fun(
    [Task, Task, Task],

    'Applies the value of one task to the value of another',

    (tb, ta) => ta::map(f => tb::map(f))::flatten()
  ),

  bimap: Fun(
    [Function, Function, Task, Task],

    'Like map but also accepts a funtion to run over the error case',

    (f, g, m) =>
      Task((fail, succeed) => {
        m.fork(
          err => fail(f(err)),
          val => succeed(g(val))
        )
      })
  ),
})

// -- Core functions

export const id = Fun(
  [Any, Any],

  "The identity function always return the argument it's called with.",

  x => x
)

// const matchPattern = (value, matcher) => {
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

export const implementsExtension = Fun(
  [[String], Any, Boolean],

  'Returns true if the value implements all of the extensions',

  (fns, obj) => {
    const map = dispatchMap[showType(getType(obj))]
    return fns::every(fn => !!map[fn])
  }
)

// -- BiFunctor Utils

export const mapError = Fun(
  [Function, Implements('bimap'), Implements('bimap')],

  "Maps a function over the 'error' case of a bifunctor",

  (fn, f) => f::bimap(fn, id)
)

// -- Applicative Utils

export const liftA2 = Fun(
  [Function, Implements('ap'), Implements('ap'), Implements('ap')],

  `Lifts a regular function of two arguments into a function that can
  operate on the values of two applicatives.

  | Example:
  |
  | liftA2(add, [2, 3], [3, 3]) //=> [5, 5, 6, 6]
  |
  | liftA2(conj, Maybe.Some(3), Maybe.Some([1, 2])) //=> Maybe.Some([1, 2, 3])
  `,

  (f, a1, a2) => a1::map(f)::ap(a2)
)

export const liftA3 = Fun(
  [
    Function,
    Implements('ap'),
    Implements('ap'),
    Implements('ap'),
    Implements('ap'),
  ],

  `Like liftA2 but for functions of three arguments`,

  (f, a1, a2, a3) => liftA2(f, a1, a2)::ap(a3)
)

export const liftA4 = Fun(
  [
    Function,
    Implements('ap'),
    Implements('ap'),
    Implements('ap'),
    Implements('ap'),
    Implements('ap'),
  ],

  `Like liftA2 but for functions of four arguments`,

  (f, a1, a2, a3, a4) => liftA3(f, a1, a2, a3)::ap(a4)
)

export const liftA5 = Fun(
  [
    Function,
    Implements('ap'),
    Implements('ap'),
    Implements('ap'),
    Implements('ap'),
    Implements('ap'),
    Implements('ap'),
  ],

  `Like liftA2 but for functions of five arguments`,

  (f, a1, a2, a3, a4, a5) => liftA4(f, a1, a2, a3, a4)::ap(a5)
)

export const liftA6 = Fun(
  [
    Function,
    Implements('ap'),
    Implements('ap'),
    Implements('ap'),
    Implements('ap'),
    Implements('ap'),
    Implements('ap'),
    Implements('ap'),
  ],

  `Like liftA2 but for functions of six arguments`,

  (f, a1, a2, a3, a4, a5, a6) => liftA5(f, a1, a2, a3, a4, a5)::ap(a6)
)

export const sequenceA = Fun(
  [[Implements('ap')], Implements('ap')],

  `Turns a list of applicatives to an applicative with a list of values

  | Example:
  |
  | sequenceA([Maybe.Some(2), Maybe.Some(4)]) //=> Maybe.Some([2, 4])
  `,

  xs =>
    xs::get(0)::caseOf({
      Some: x => foldr(liftA2(append), x::pure([]), xs),
      None: () => {
        throw new TypeError(`Can't call sequenceA with an empty list`)
      },
    })
)

// -- Monadic Utils

export const flatMap = Fun(
  [Function, Implements('map', 'flatten'), Implements('map', 'flatten')],

  `Maps each element using a mapping function and then flattens the result.

   | Example:
   |
   |   Maybe.Some(1)::flatMap(x => Maybe.Some(x + 2)) //=> Maybe.Some(3)
  `,

  (fn, m) => m::map(fn)::flatten()
)

// -- Collection Utils

export const mapKV = Fun(
  [Function, Implements('foldlKV'), Implements('foldlKV')],

  `Same as regular map but also passes the key to the function.
  Only works for keyed colletions`,

  (f, xs) => xs::foldlKV((k, v, acc) => acc::append(f(k, v)), empty(xs))
)

export const filterKV = Fun(
  [Function, Implements('foldlKV'), Implements('foldlKV')],

  'Filters a collection by yielding each key and value to a predicate function',

  (f, xs) =>
    xs::foldlKV((k, v, acc) => (f(k, v) ? append(v, acc) : acc), empty(xs))
)

export const filter = Fun(
  [Function, Implements('foldl'), Implements('foldl')],

  'Filters a collection by yielding each value to a predicate function',

  (f, xs) => xs::foldl((v, acc) => (f(v) ? append(v, acc) : acc), empty(xs))
)

export const removeKV = Fun(
  [Function, Implements('foldlKV'), Implements('foldlKV')],

  'Removes items from a collection by yielding each key and value to a predicate function',

  (f, xs) =>
    xs::foldlKV((k, v, acc) => (!f(k, v) ? append(v, acc) : acc), empty(xs))
)

export const remove = Fun(
  [Function, Implements('foldl'), Implements('foldl')],

  'Removes items from a collection by yielding each value to a predicate function',

  (f, xs) => xs::foldl((v, acc) => (!f(v) ? append(v, acc) : acc), empty(xs))
)

export const any = Fun(
  [Function, Implements('foldl'), Boolean],

  'Returns true if at least on element in a collection satisfies a predicate',

  (f, xs) => xs::foldl((x, acc) => (acc ? acc : !!f(x)), false)
)

export const every = Fun(
  [Function, Implements('foldl'), Boolean],

  'Returns true if every element in a collection satisfies the predicate.',

  (f, xs) => xs::foldl((x, acc) => (!acc ? acc : !!f(x)), true)
)

export const getOrElse = Fun(
  [OneOf([String, Number]), Any, Implements('get'), Any],

  `Attempts to look up a value by key in a collection,
   returns fallback if it can't be found.

   | Example:
   |
   | { a: 'found' }::getOrElse('a', 'not-found') //=> 'found'
   | { a: 'found' }::getOrElse('b', 'not-found') //=> 'not-found'
  `,

  (key, fallback, xs) =>
    xs::get(key)::caseOf({ Some: id, None: () => fallback })
)

export const getIn = Fun(
  [[OneOf([String, Number])], Implements('get'), Maybe(Any)],

  `Looks up a path in a collection and returns the result in a Maybe.

   | Examples:
   |
   | { x: { y: 'z' } }::getIn(['x', 'y']) //=> Maybe.Some('z')
   | { x: {} }::getIn(['x', 'y'])         //=> Maybe.None( )
   |
   | [ [ ['a', 'b'], ['c', 'd'] ] ]::getIn([0, 1, 0]) //=> Maybe.Some('c')
   | []::getIn([0, 1, 0])                             //=> Maybe.None( )
  `,

  ([key, ...rest], obj) =>
    rest::count() === 0
      ? obj::get(key)
      : obj::get(key)::caseOf({
          Some: x => x::getIn(rest),
          None: () => obj::get(key),
        })
)

export const getInOrElse = Fun(
  [[OneOf([String, Number])], Any, Implements('get'), Any],

  `Like getIn but returns the actual value if it exists or fallback otherwise`,

  (path, fallback, coll) =>
    coll::getIn(path)::caseOf({ Some: id, None: () => fallback })
)

export const assocIn = Fun(
  [
    [OneOf([String, Number])],
    Any,
    Implements('assoc', 'get'),
    Implements('assoc', 'get'),
  ],

  'Like assoc but accepts a path instead of a single key',

  ([key, ...rest], val, obj) =>
    rest::count() === 0
      ? obj::assoc(key, val)
      : obj::get(key)::caseOf({
          Some: x => obj::assoc(key, x::assocIn(rest, val)),
          None: () => obj::assoc(key, obj::empty()::assocIn(rest, val)),
        })
)

export const dissocIn = Fun(
  [
    [OneOf([String, Number])],
    Implements('assoc', 'dissoc', 'get'),
    Implements('assoc', 'dissoc', 'get'),
  ],

  'Like dissoc but accepts a path instead of a single key',

  ([key, ...rest], obj) =>
    rest::count() === 0
      ? obj::dissoc(key)
      : obj::get(key)::caseOf({
          Some: x => obj::assoc(key, x::dissocIn(rest)),
          None: () => obj::assoc(key, obj::empty()::dissocIn(rest)),
        })
)

export const isEmpty = Fun(
  [Implements('count'), Boolean],

  'Returns true if the collection is empty',

  x => x::count() === 0
)

export const evolve = Fun(
  [Object, Implements('assoc', 'get'), Implements('assoc', 'get')],

  `Given an object and a "receipt" of changes it returns a
   new copy of the original collection with the changes applied.
   Throws an error if a key in the "receipt" doesn't exist in th collection

   | Example:
   |
   | const state = { counters: { counterA: 0, counterB: 0, counterC: 0 } }
   |
   | state::evolve({ counters: { counterA: 4, counterB: plus(20) } })
   |   //=> { counters: { counterA: 4, counterB: 20, counterC: 0 } }
  `,

  (transformations, object) =>
    transformations::foldl(([key, val], acc) => {
      if (val.constructor === Object && !val::is(Union)) {
        return acc::assoc(key, evolve(val, object::getOrElse(key, acc)))
      } else if (typeof val === 'function') {
        return acc::assoc(key, val(acc::getOrElse(key, void 0)))
      } else {
        return acc::assoc(key, val)
      }
    }, object)
)

// -- Function utils

export const flip = Fun(
  [Function, Any, Any, Any],

  'Flips the argument order of a function that takes two arguments',

  (f, a, b) => f(b, a)
)

export const comp = Fun(
  [[Function], Function],

  `Performs right-to-left function composition.`,

  fns =>
    withMeta(x => foldr((f, acc) => f(acc), x, fns), {
      name: fns::map(getMeta('name')).join(' . '),
    })
)

// -- Logic utils

export const not = Fun(
  [Any, Boolean],

  "Returns true if it's argument is falsy",

  a => !!!a
)

export const equal = Fun(
  [Any, Any, Boolean],

  'Strict equality check',

  (a, b) => a === b
)

export const deepEqual = Fun(
  [Any, Any, Boolean],

  'Performs a deep equality check',

  (a, b) => {
    if (a::is(String) || b::is(String)) return a::equal(b)

    if (
      a::implementsExtension(['foldlKV']) &&
      b::implementsExtension(['get'])
    ) {
      return a::foldlKV((key, val, acc) => {
        if (val::is(Array) && val::count() === 2 && val[0] === key) {
          return b::getOrElse(key, false)::deepEqual(val[1])
        } else {
          return b::getOrElse(key, false)::deepEqual(val)
        }
      }, true)
    } else {
      return a === b
    }
  }
)

// -- Number utils

export const lt = Fun(
  [Number, Number, Boolean],

  'Returns true if the last number is less than the first number',

  (a, b) => b < a
)

export const gt = Fun(
  [Number, Number, Boolean],

  'Returns true if the last number is greater than the first number',

  (a, b) => b > a
)

export const plus = Fun(
  [Number, Number, Boolean],

  'Returns the sum of two numbers',

  (a, b) => b + a
)

export const times = Fun(
  [Number, Number, Boolean],

  'Returns the product of two numbers',

  (a, b) => b * a
)

export const div = Fun(
  [Num(comp([not, equal(0)])), Num, Num],

  'Returns the remainder of two numbers',

  (a, b) => b / a
)

// -- String Utils

export const split = Fun(
  [OneOf([String, RegExp]), String, [String]],

  'Creates an array by splitting a string by a pattern',

  (pattern, str) => str.split(pattern)
)

export const replace = Fun(
  [OneOf([String, RegExp]), String, String, String],

  'Replaces occurrances of pattern in str with the replacement string.',

  (pattern, replacement, str) => str.replace(pattern, replacement)
)

export const lowercase = Fun(
  [String, String],

  'Returns the source string in all lowercase.',

  str => str.toLowerCase()
)

export const uppercase = Fun(
  [String, String],

  'Returns the source string in all lowercase.',

  str => str.toUpperCase()
)

export const capitalize = Fun(
  [String, String],

  'It capitalizes a string',

  str =>
    str::count() === 0 ? str : str[0]::uppercase() + str::rest()::lowercase()
)
