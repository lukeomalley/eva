/**
 * Environment - Named storage for variables
 */
export default class Environment {
  constructor(values = {}, enclosing = null) {
    this.enclosing = enclosing;
    this.values = values;
  }

  /**
   * Declares a variable in the current scope
   */
  define(name, value) {
    if (Object.prototype.hasOwnProperty.call(this.values, name)) {
      throw new ReferenceError(`Variable ${name} has already been declared.`);
    }
    this.values[name] = value;
    return value;
  }

  /**
   * Sets a variable in the scope chain
   */
  set(name, value) {
    this.resolve(name).values[name] = value;
    return value;
  }

  /**
   * Returns the value of the given variable
   */
  get(name) {
    return this.resolve(name).values[name];
  }

  /**
   * Returns the environment which contains the name
   */
  resolve(name) {
    if (Object.prototype.hasOwnProperty.call(this.values, name)) {
      return this;
    }

    if (this.enclosing === null) {
      throw new ReferenceError(`Variable ${name} is not defined.`);
    }

    return this.enclosing.resolve(name);
  }
}
