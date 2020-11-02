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

    for (let i = 0; i < cases.length - 1; i += 1) {
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

  /**
   * (for (var x 10) (> x 0) (-- x) (print x))
   */
  transformForToWhile(forExpr) {
    const [, init, condition, modifier, body] = forExpr;
    return ['begin', init, ['while', condition, ['begin', ...body, modifier]]];
  }

  transformIncToSet(incExpr) {
    return ['set', incExpr[1], ['+', incExpr[1], 1]];
  }

  transformDecToSet(decExpr) {
    return ['set', decExpr[1], ['-', decExpr[1], 1]];
  }
}

module.exports = Transformer;
