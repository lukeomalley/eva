const Environment = require('./Environment');
const Transformer = require('./transformer/Transformer');
const GlobalEnvironment = require('./GlobalEnvironment');
const { isNumber, isString, isVariableName } = require('../util');

/**
 * Eva interpreter
 */
class Eva {
  constructor(globalEnv = GlobalEnvironment) {
    this.global = globalEnv;
    this.transformer = new Transformer();
  }

  eval(expr, env = this.global) {
    // =========================================================================
    // Literals
    // =========================================================================
    if (isNumber(expr)) {
      return expr;
    }

    if (isString(expr)) {
      return expr.slice(1, -1);
    }

    // =========================================================================
    // Variables
    // =========================================================================
    if (expr[0] === 'var') {
      const [, name, value] = expr;
      return env.define(name, this.eval(value, env));
    }

    if (expr[0] === 'set') {
      const [, name, value] = expr;
      return env.set(name, this.eval(value, env));
    }

    if (isVariableName(expr)) {
      return env.get(expr);
    }

    // =========================================================================
    // Blocks
    // =========================================================================
    if (expr[0] === 'begin') {
      const blockEnv = new Environment({}, env);

      return this.evalBlock(expr, blockEnv);
    }

    // =========================================================================
    // Conditionals
    // =========================================================================
    if (expr[0] === 'if') {
      const [, condition, consequent, alternate] = expr;
      if (this.eval(condition, env)) {
        return this.eval(consequent, env);
      }

      return this.eval(alternate, env);
    }

    // =========================================================================
    // Loops
    // =========================================================================
    if (expr[0] === 'while') {
      const [, condition, body] = expr;
      let result;
      while (this.eval(condition, env)) {
        result = this.eval(body, env);
      }

      return result;
    }

    // =========================================================================
    // Function Declarations
    // =========================================================================
    if (expr[0] === 'def') {
      const varExpr = this.transformer.transformDefToVarLambda(expr);
      return this.eval(varExpr, env);
    }

    if (expr[0] === 'lambda') {
      const [, params, body] = expr;

      return { params, body, env };
    }

    // =========================================================================
    // Function Calls
    // =========================================================================
    if (Array.isArray(expr)) {
      const fn = this.eval(expr[0], env);
      const args = expr.slice(1).map((ex) => this.eval(ex, env));

      // Native Functions
      if (typeof fn === 'function') {
        return fn(...args);
      }

      // User Defined Functions
      const activationRecord = {};
      fn.params.forEach((param, i) => {
        activationRecord[param] = args[i];
      });

      const activationEnvironment = new Environment(activationRecord, fn.env);
      return this.evalBody(fn.body, activationEnvironment);
    }

    console.log(`Unimplemented: ${JSON.stringify(expr)}`);
    return null;
  }

  // =========================================================================
  // Util Methods
  // =========================================================================

  evalBody(body, env) {
    if (body[0] === 'block') {
      return this.evalBlock(body, env);
    }

    return this.eval(body, env);
  }

  evalBlock(block, env) {
    let result;

    const [, ...expressions] = block;

    expressions.forEach((expr) => {
      result = this.eval(expr, env);
    });

    return result;
  }
}

module.exports = Eva;
