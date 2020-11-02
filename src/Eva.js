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
      const [, ref, value] = expr;

      if (ref[0] === 'prop') {
        const [, instance, propName] = ref;
        const instanceEnv = this.eval(instance, env);

        return instanceEnv.define(propName, this.eval(value, env));
      }

      return env.set(ref, this.eval(value, env));
    }

    if (isVariableName(expr)) {
      return env.get(expr);
    }

    // =========================================================================
    // Operators
    // =========================================================================

    if (expr[0] === '++') {
      const setExpr = this.transformer.transformIncToSet(expr);
      return this.eval(setExpr, env);
    }

    if (expr[0] === '--') {
      const setExpr = this.transformer.transformDecToSet(expr);
      return this.eval(setExpr, env);
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

    if (expr[0] === 'switch') {
      const ifExpr = this.transformer.transformSwitchToIf(expr);
      return this.eval(ifExpr, env);
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

    if (expr[0] === 'for') {
      const whileExpr = this.transformer.transformForToWhile(expr);
      return this.eval(whileExpr, env);
    }

    // =========================================================================
    // Classes
    // =========================================================================
    if (expr[0] === 'class') {
      const [, name, parent, body] = expr;
      const parentEnv = this.eval(parent, env) || env;
      const classEnv = new Environment({}, parentEnv);

      this.evalBody(body, classEnv);
      return env.define(name, classEnv);
    }

    if (expr[0] === 'new') {
      const classEnv = this.eval(expr[1], env);
      const instanceEnv = new Environment({}, classEnv);
      const args = expr.slice(2).map((arg) => this.eval(arg, env));

      // Call the constructor
      this.callUserDefinedFunction(classEnv.get('constructor'), [instanceEnv, ...args]);

      return instanceEnv;
    }

    if (expr[0] === 'prop') {
      const [, instance, name] = expr;
      const instanceEnv = this.eval(instance, env);
      return instanceEnv.get(name);
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
      return this.callUserDefinedFunction(fn, args);
    }

    console.log(`Unimplemented: ${JSON.stringify(expr)}`);
    return null;
  }

  // =========================================================================
  // Util Methods
  // =========================================================================

  callUserDefinedFunction(fn, args) {
    const activationRecord = {};
    fn.params.forEach((param, i) => {
      activationRecord[param] = args[i];
    });

    const activationEnvironment = new Environment(activationRecord, fn.env);
    return this.evalBody(fn.body, activationEnvironment);
  }

  evalBody(body, env) {
    if (body[0] === 'begin') {
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
