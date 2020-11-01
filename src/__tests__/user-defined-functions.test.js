const { testEva } = require('./test-runner');

function TestUserDefinedFunctions() {
  console.log('User Defined Function Tests');
  console.log('--------------------------------------------------------------------------------');

  const tests = [
    {
      name: 'Functons 2',
      input: `
        (begin
          (def square (x)
            (* x x)
          )
          (square 5)
        )
      `,
      expected: 25,
    },
  ];

  testEva(tests);
}

module.exports = TestUserDefinedFunctions;
