/**
 * Environment - Named storage for variables
 */
class Environment {
  constructor(values = {}, enclosing = null) {
    this.enclosing = enclosing;
    this.values = values;
  }

  /**
   * Stores a variable in the environment
   */
  set(name, value) {
    this.values[name] = value;
    return value;
  }

  /**
   * Returns the value of the given variable
   */
  get(name) {
    if (this.values.hasOwnProperty(name)) {
      return this.values[name];
    }

    if (this.enclosing === null) {
      throw new ReferenceError(`Variable ${name} is not defined.`);
    }

    return this.enclosing.get(name);
  }
}

module.exports = Environment;
