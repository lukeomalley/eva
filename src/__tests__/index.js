/* eslint-disable global-require */
const tests = [require('./raw-expression.test'), require('./s-expressions.test')];

function runTests() {
  tests.forEach((test) => {
    test();
  });
}

runTests();
