const Environment = require('./Environment');

/**
 * Eva interpreter
 */
class Eva {
  constructor(globalEnv = new Environment()) {
    this.global = globalEnv;
  }

  eval(expr, env = this.global) {
    // =========================================================================
    // Literals
    // =========================================================================
    if (this.isNumber(expr)) {
      return expr;
    }

    if (this.isString(expr)) {
      return expr.slice(1, -1);
    }

    // =========================================================================
    // Binary Operators
    // =========================================================================
    if (expr[0] === '+') {
      return this.eval(expr[1], env) + this.eval(expr[2], env);
    }

    if (expr[0] === '*') {
      return this.eval(expr[1], env) * this.eval(expr[2], env);
    }

    if (expr[0] === '-') {
      return this.eval(expr[1], env) - this.eval(expr[2], env);
    }

    if (expr[0] === '/') {
      return this.eval(expr[1], env) / this.eval(expr[2], env);
    }

    if (expr[0] === '%') {
      return this.eval(expr[1], env) % this.eval(expr[2], env);
    }

    // =========================================================================
    // Conparison Operators
    // =========================================================================
    if (expr[0] === '>') {
      return this.eval(expr[1], env) > this.eval(expr[2], env);
    }

    if (expr[0] === '<') {
      return this.eval(expr[1], env) < this.eval(expr[2], env);
    }

    if (expr[0] === '>=') {
      return this.eval(expr[1], env) >= this.eval(expr[2], env);
    }

    if (expr[0] === '<=') {
      return this.eval(expr[1], env) <= this.eval(expr[2], env);
    }

    if (expr[0] === '==') {
      return this.eval(expr[1], env) === this.eval(expr[2], env);
    }

    // =========================================================================
    // Variables
    // =========================================================================
    if (expr[0] === 'var') {
      const [_tag, name, value] = expr;
      return env.define(name, this.eval(value, env));
    }

    if (expr[0] === 'set') {
      const [_tag, name, value] = expr;
      return env.set(name, this.eval(value, env));
    }

    if (this.isVariableName(expr)) {
      return env.get(expr);
    }

    // =========================================================================
    // Blocks
    // =========================================================================
    if (expr[0] === 'begin') {
      const blockEnv = new Environment({}, env);
      return this._evalBlock(expr, blockEnv);
    }

    // =========================================================================
    // Conditionals
    // =========================================================================
    if (expr[0] === 'if') {
      const [_tag, condition, consequent, alternate] = expr;
      if (this.eval(condition, env)) {
        return this.eval(consequent, env);
      }

      return this.eval(alternate, env);
    }

    // =========================================================================
    // Loops
    // =========================================================================
    if (expr[0] === 'while') {
      const [_tag, condition, body] = expr;
      let result;
      while (this.eval(condition, env)) {
        result = this.eval(body, env);
      }

      return result;
    }

    // =========================================================================
    // Print
    // =========================================================================

    if (expr[0] === 'print') {
      console.log(this.eval(expr[1], env));
      return null;
    }

    console.log(`Unimplemented: ${JSON.stringify(expr)}`);
  }

  _evalBlock(block, env) {
    let result;

    const [_tag, ...expressions] = block;
    expressions.forEach((expr) => {
      result = this.eval(expr, env);
    });

    return result;
  }

  isVariableName(expr) {
    return typeof expr === 'string' && /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(expr);
  }

  isNumber(expr) {
    return typeof expr === 'number';
  }

  isString(expr) {
    return (
      typeof expr === 'string' &&
      expr[0] === '"' &&
      expr[expr.length - 1] === '"'
    );
  }
}

module.exports = Eva;
