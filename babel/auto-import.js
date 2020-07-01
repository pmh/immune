const I = require('./lib')
var utils = Object.keys(I).reduce((acc, key) => ((acc[key] = true), acc), {})

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
