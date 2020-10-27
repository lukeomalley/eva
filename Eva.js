/**
 * Eva interpreter
 */
class Eva {
  eval(expr) {
    if (this.isNumber(expr)) {
      return expr;
    }

    if (this.isString(expr)) {
      return expr.slice(1, -1);
    }

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

    throw 'Unimplemented';
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
