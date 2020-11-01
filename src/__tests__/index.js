/* eslint-disable global-require */
// prettier-ignore
const tests = [
  require('./raw-expression.test'),
  require('./s-expressions.test'),
  require('./built-ins.test'),
];

function runTests() {
  tests.forEach((test) => {
    test();
    console.log('\n');
  });
}

runTests();
