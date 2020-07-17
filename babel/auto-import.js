var utils = [
  // -- Core

  '__',
  'getType',
  'showType',
  'show',
  'curry',
  'is',
  'Fun',
  'extendType',
  'Dispatch',
  'docstr',
  'Type',
  'Union',

  // -- Core Types

  'Any',
  'Null',
  'OneOf',
  'Implements',
  'Spread',
  'Num',
  'Str',
  'Arr',
  'Obj',
  'Maybe',
  'maybe',
  'Result',
  'result',
  'Task',

  // -- Core Functions

  'clone',
  'shallowClone',
  'empty',
  'append',
  'count',
  'get',
  'first',
  'rest',
  'foldlKV',
  'foldrKV',
  'foldl',
  'foldr',
  'map',
  'bimap',
  'assoc',
  'dissoc',
  'pure',
  'flatten',
  'ap',
  'keys',
  'join',
  'slice',
  'id',
  'caseOf',
  'implementsExtension',
  'mapError',
  'liftA2',
  'liftA3',
  'liftA4',
  'liftA5',
  'liftA6',
  'sequenceA',
  'flatMap',
  'mapKV',
  'filterKV',
  'filter',
  'removeKV',
  'remove',
  'any',
  'every',
  'getOrElse',
  'getIn',
  'getInOrElse',
  'assocIn',
  'dissocIn',
  'isEmpty',
  'evolve',
  'flip',
  'comp',
  'not',
  'equal',
  'deepEqual',
  'lt',
  'gt',
  'plus',
  'minus',
  'times',
  'div',
  'split',
  'replace',
  'lowercase',
  'uppercase',
  'capitalize',
  'contains',
].reduce((acc, name) => Object.assign({}, acc, { [name]: true }), {})

/* auto-import.js
 *
 * A babel plugin that autmatically imports functions from immune as
 * they are used.
 *
 * For example the following input:
 *
 *   map(x => x + 1, [1, 2, 3])
 *
 * Would be transformed to the following output:
 *
 *   import { map } from 'immune';
 *   map(x => x + 1, [1, 2, 3])
 *
 * However if the name has already been defined (shadowed) no import will be added.
 * So the following input:
 *
 *   let map = (f, xs) => xs.map(f)
 *   map(x => x + 1, [1, 2, 3])
 *
 * Would result in the following unchanged output:
 *
 *   let map = (f, xs) => xs.map(f)
 *   map(x => x + 1, [1, 2, 3])
 */

module.exports = function (babel) {
  const { types: t } = babel

  return {
    name: 'immune-auto-import',

    visitor: {
      Program: {
        enter: (path, env) => {
          env.file.set('bind-imports', [])
        },

        exit: (path, env) => {
          if (env.filename.match(/\/immune.js$/)) return

          const imports = env.file.get('bind-imports')
          const uniqueImports = imports.filter(
            (module, idx) => imports.indexOf(module) === idx
          )

          if (env.file.get('bind-imports').length)
            path.node.body = [
              t.importDeclaration(
                env.file.get('bind-imports').map(name => {
                  return t.importSpecifier(
                    t.identifier(name),
                    t.identifier(name)
                  )
                }),
                t.stringLiteral('immune')
              ),
            ].concat(path.node.body)
        },
      },

      Identifier(path, env) {
        var node = path.node,
          scope = path.scope

        if (
          !scope.hasBinding(node.name) &&
          utils[node.name] &&
          !env.file.get('bind-imports').some(imp => imp === node.name)
        ) {
          env.file.set(
            'bind-imports',
            env.file.get('bind-imports').concat(node.name)
          )
        }
      },
    },
  }
}
