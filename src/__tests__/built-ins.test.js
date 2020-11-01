const { testEva } = require('./test-runner');

function TestBuiltIns() {
  console.log('Builtins Tests');
  console.log('--------------------------------------------------------------------------------');
  const tests = [
    { name: 'Builtins 1', input: '(+ 1 5)', expected: 6 },
    {
      name: 'Builtins 2',
      input: `
        (+ (+ 2 3) 5)
      `,
      expected: 10,
    },
    {
      name: 'Builtins 3',
      input: `
        (+ (* 20 10) 500)
      `,
      expected: 700,
    },
    {
      name: 'Builtins 4',
      input: `
        (> 5 10)
      `,
      expected: false,
    },
    {
      name: 'Builtins 5',
      input: `
        (< 5 10)
      `,
      expected: true,
    },
  ];

  testEva(tests);
}

module.exports = TestBuiltIns;
