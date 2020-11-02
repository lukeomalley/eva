const { testEva } = require('./test-runner');

function TestIncrementDecrement() {
  console.log('Increment Decrement Tests');
  console.log('--------------------------------------------------------------------------------');

  const tests = [
    {
      name: 'Increment 1',
      input: `
        (begin
          (var x 1)
          (++ x)
        )
      `,
      expected: 2,
    },
    {
      name: 'Decrement 1',
      input: `
        (begin
          (var x 1)
          (-- x)
        )
      `,
      expected: 0,
    },
  ];

  testEva(tests);
}

module.exports = TestIncrementDecrement;
