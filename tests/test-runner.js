const assert = require('assert');
const Eva = require('../src/Eva');
const Environment = require('../src/Environment');

function testEva(tests) {
  let testHasFailed = false;
  tests.forEach((test) => {
    const eva = new Eva(
      new Environment({
        null: null,
        true: true,
        false: false,
      }),
    );

    // Execute the code
    let result;
    try {
      result = eva.eval(test.input);
    } catch (err) {
      console.log(`[test - ${test.name}] RuntimeError: ${err.message}`);
    }

    // Compare the results
    try {
      assert.strictEqual(result, test.expected);
    } catch (err) {
      testHasFailed = true;
      console.log(`[test - ${test.name}] Failed: expected ${test.expected}, but got ${result}`);
    }
  });

  if (!testHasFailed) {
    console.log(`Ok: ${tests.length} tests passed! 🎉`);
  }
}

module.exports = testEva;
