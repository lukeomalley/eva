/**
 * AST Transformer
 */
class Transformer {
  transformDefToVarLambda(defExpr) {
    const [, name, params, body] = defExpr;
    return ['var', name, ['lambda', params, body]];
  }
}

module.exports = Transformer;
