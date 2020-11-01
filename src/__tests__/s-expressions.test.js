const { testEva } = require('./test-runner');

function test() {
  console.log('S Expression Tests');
  console.log('--------------------------------------------------------------------------------');

  const tests = [
    { name: 'numbers 1', input: '1', expected: 1 },
    {
      name: 'numbers 2',
      input: `
        (+ 5 5)
      `,
      expected: 10,
    },
    {
      name: 'numbers 3',
      input: `
        (begin
          (var x 10)  
          (var y 20)  
          (+ (* x 10) y)
        )
      `,
      expected: 120,
    },
  ];

  testEva(tests);
}

module.exports = test;
