/**
 * Environment - Named storage for variables
 */
class Environment {
  constructor(values = {}) {
    this.values = values;
  }

  /**
   * Stores a variable in the environment
   * @param {*} name The name of the variable to store.
   * @param {*} value The value of the variable to store.
   * @returns The value set.
   */
  define(name, value) {
    this.values[name] = value;
    return value;
  }
}

module.exports = Environment;
