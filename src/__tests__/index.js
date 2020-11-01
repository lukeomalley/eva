/* eslint-disable global-require */

const tests = [
  require('./raw-expression.test'),
  require('./s-expressions.test'),
  require('./built-ins.test'),
  require('./user-defined-functions.test'),
  require('./lambda-functions.test'),
  require('./switch.test'),
];

function runTests() {
  tests.forEach((test) => {
    test();
    console.log('\n');
  });
}

runTests();
