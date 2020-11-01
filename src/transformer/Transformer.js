/**
 * AST Transformer
 */
class Transformer {
  transformDefToVarLambda(defExpr) {
    const [, name, params, body] = defExpr;
    return ['var', name, ['lambda', params, body]];
  }

  transformSwitchToIf(switchExpr) {
    const [, ...cases] = switchExpr;

    const ifExpr = ['if', null, null, null];

    let currentIfExpr = ifExpr;

    for (let i = 0; i < cases.length - 1; i++) {
      const [currentCond, currentBlock] = cases[i];

      currentIfExpr[1] = currentCond;
      currentIfExpr[2] = currentBlock;

      const next = cases[i + 1];
      const [nextCond, nextBlock] = next;

      currentIfExpr[3] = nextCond === 'else' ? nextBlock : ['if'];

      [, , , currentIfExpr] = currentIfExpr;
    }

    return ifExpr;
  }
}

module.exports = Transformer;
