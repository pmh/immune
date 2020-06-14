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

var utils = [
  // -- Core

  "__",
  "withMeta",
  "defn",
  "curry",
  "doc",
  "is",
  "id",
  "identity",
  "Protocol",
  "extendProtocol",
  "extendType",
  "implementsProtocol",
  "defmulti",
  "defmethod",
  "Type",
  "Union",
  "caseOf",

  // -- Protocols

  "IShow",
  "show",
  "IClone",
  "clone",
  "shallowClone",
  "ICount",
  "count",
  "IHash",
  "hash",
  "ISeq",
  "first",
  "rest",
  "ICollection",
  "conj",
  "IIterator",
  "iterator",
  "IKeyed",
  "keys",
  "IAssociative",
  "assoc",
  "dissoc",
  "ISet",
  "disj",
  "ILookup",
  "get",
  "IMonoid",
  "empty",
  "append",
  "IFold",
  "foldl",
  "foldlKV",
  "foldr",
  "IFunctor",
  "map",
  "ICata",
  "cata",
  "IBifunctor",
  "bimap",
  "IApplicative",
  "ap",
  "IMonadic",
  "flatten",
  "flatMap",
  "flatMapError",

  // -- Types

  "Any",
  "Sum",
  "Product",
  "Maybe",
  "maybe",
  "Result",
  "Task",
  "fork",

  // -- Function Utils

  "memoize",
  "pipe",
  "comp",
  "liftA2",
  "liftA3",
  "liftA4",
  "liftA5",
  "liftA6",

  // -- List Utils

  "join",

  // -- Collection Utils

  "getOrElse",
  "getInOrElse",
  "getIn",
  "assocIn",
  "dissocIn",
  "evolve",
  "filter",
  "filterKV",
  "remove",
  "removeKV",
  "cons",
  "take",
  "into",
  "zip",
  "intersperse",
  "equal",
  "shallowEqual",
  "deepEqual",
  "any",
  "every",
  "vals",
  "kvp",
  "range",

  // -- String Utils

  "split",
  "replace",
  "lowercase",
  "uppercase",

  // -- Profunctor utils

  "promap",
  "view",
  "set",
  "update",

  // -- Bimap utils
  "mapError",
].reduce((acc, name) => Object.assign({}, acc, { [name]: true }), {});

module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: "immune-auto-import",

    visitor: {
      Program: {
        enter: (path, env) => {
          env.file.set("bind-imports", []);
        },

        exit: (path, env) => {
          if (env.filename.match(/\/immune.js$/)) return;

          const imports = env.file.get("bind-imports");
          const uniqueImports = imports.filter(
            (module, idx) => imports.indexOf(module) === idx
          );

          if (env.file.get("bind-imports").length)
            path.node.body = [
              t.importDeclaration(
                env.file.get("bind-imports").map((name) => {
                  return t.importSpecifier(
                    t.identifier(name),
                    t.identifier(name)
                  );
                }),
                t.stringLiteral("immune")
              ),
            ].concat(path.node.body);
        },
      },

      Identifier(path, env) {
        var node = path.node,
          scope = path.scope;

        if (
          !scope.hasBinding(node.name) &&
          utils[node.name] &&
          !env.file.get("bind-imports").some((imp) => imp === node.name)
        ) {
          env.file.set(
            "bind-imports",
            env.file.get("bind-imports").concat(node.name)
          );
        }
      },
    },
  };
};
