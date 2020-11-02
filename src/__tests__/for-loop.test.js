const { testEva } = require('./test-runner');

function TestForLoop() {
  console.log('For Loop Tests');
  console.log('--------------------------------------------------------------------------------');

  const tests = [
    {
      name: 'For Loop 1',
      input: `
        (begin
          (var result 0)

          (for 
            (var x 10) 
            (> x 0) 
            (-- x) 
            (
              (++ result) 
            )
          )

          result
        )
      `,
      expected: 10,
    },
  ];

  testEva(tests);
}

module.exports = TestForLoop;
