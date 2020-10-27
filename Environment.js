/**
 * Environment - Named storage for variables
 */
class Environment {
  constructor(values = {}) {
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
    if (!this.values.hasOwnProperty(name)) {
      throw new ReferenceError(`Variable ${name} is not defined.`);
    }

    return this.values[name];
  }
}

module.exports = Environment;
