const assert = require('assert');

const Eva = require('../Eva');
const Environment = require('../Environment');

function testEval() {
  const tests = [
    // Numbers
    { input: 1, expected: 1 },
    { input: 5, expected: 5 },
    { input: 1000, expected: 1000 },

    // Strings
    { input: '"hello"', expected: 'hello' },
    { input: '"world"', expected: 'world' },

    // Binary Operations
    { input: ['+', 1, 5], expected: 6 },
    { input: ['%', 2, 2], expected: 0 },
    { input: ['+', ['*', 3, 2], 5], expected: 11 },
    { input: ['/', ['*', 3, 2], 3], expected: 2 },
    { input: ['-', ['-', ['*', 5, 5], 2], 3], expected: 20 },

    // Variables
    { input: ['var', 'x', 5], expected: 5 },
    { input: 'x', expected: 5 },
    { input: ['var', 'isUser', 'true'], expected: true },
    { input: 'isUser', expected: true },

    // Globals
    { input: 'null', expected: null },
    { input: 'true', expected: true },
    { input: 'false', expected: false },
  ];

  let testHasFailed = false;
  const eva = new Eva(
    new Environment({
      null: null,
      true: true,
      false: false,
    })
  );

  tests.forEach((test, i) => {
    const result = eva.eval(test.input);

    try {
      assert.strictEqual(result, test.expected);
    } catch (err) {
      testHasFailed = true;
      console.log(typeof result);
      console.log(typeof test.expected);

      console.log(
        `[test - ${test.input}] Failed: expected ${test.expected}, but got ${result}`
      );
    }
  });

  if (!testHasFailed) {
    console.log(`Ok: ${tests.length} tests passed! 🎉`);
  }
}

testEval();
