/* chain.js
 *
 * A babel plugin that allows pattern matching to use object literal syntax
 * instead of array of arrags
 *
 * Example:
 *
 *   foo::caseOf({
 *     [{ a: Number, b: Number }]: obj => 'matched!',
 *     [{ a: { b: 'foo' } }]: obj => 'matched',
 *   })
 *
 * Would be transformed into:
 *
 *   foo::caseOf([
 *     [{ a: Number, b: Number }, obj => 'matched!'],
 *     [{ a: { b: 'foo' } }, obj => 'matched']
 *   ])
 */

module.exports = function (babel) {
  const { types: t } = babel

  return {
    name: 'pattern-match',
    visitor: {
      CallExpression(path) {
        const node = path.node
        if (node.callee.name === 'caseOf') {
          if (node.arguments[0] && t.isObjectExpression(node.arguments[0])) {
            const objExpr = node.arguments[0]
            node.arguments[0] = t.arrayExpression(
              objExpr.properties.map(prop =>
                t.arrayExpression([
                  t.isIdentifier(prop.key)
                    ? t.stringLiteral(prop.key.name)
                    : prop.key,
                  prop.value,
                ])
              )
            )
          }
        }
      },
    },
  }
}
