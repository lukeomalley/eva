const Environment = require('./Environment');

/**
 * Default Global Environment
 */
const GlobalEnvironment = new Environment({
  null: null,
  true: true,
  false: false,

  print(...args) {
    console.log(...args);
    return null;
  },

  '+': function (op1, op2) {
    return op1 + op2;
  },

  '-': function (op1, op2 = null) {
    if (op2 === null) {
      return -op1;
    }
    return op1 - op2;
  },

  '*': function (op1, op2) {
    return op1 * op2;
  },

  '/': function (op1, op2) {
    return op1 / op2;
  },

  '%': function (op1, op2) {
    return op1 % op2;
  },

  '>': function (op1, op2) {
    return op1 > op2;
  },

  '>=': function (op1, op2) {
    return op1 >= op2;
  },

  '<': function (op1, op2) {
    return op1 < op2;
  },

  '<=': function (op1, op2) {
    return op1 <= op2;
  },

  '=': function (op1, op2) {
    return op1 === op2;
  },
});

module.exports = GlobalEnvironment;
