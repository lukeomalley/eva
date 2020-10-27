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
      return this.eval(expr[1]) + this.eval(expr[2]);
    }

    if (expr[0] === '*') {
      return this.eval(expr[1]) * this.eval(expr[2]);
    }

    if (expr[0] === '-') {
      return this.eval(expr[1]) - this.eval(expr[2]);
    }

    if (expr[0] === '/') {
      return this.eval(expr[1]) / this.eval(expr[2]);
    }

    if (expr[0] === '%') {
      return this.eval(expr[1]) % this.eval(expr[2]);
    }

    // =========================================================================
    // Variables
    // =========================================================================
    if (expr[0] === 'var') {
      const [_, name, value] = expr;
      env.set(name, value);
      return value;
    }

    if (this.isVariableName(expr)) {
      return env.get(expr);
    }

    console.log(`Unimplemented: ${JSON.stringify(expr)}`);
  }

  isVariableName(expr) {
    return typeof expr === 'string' && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(expr);
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
