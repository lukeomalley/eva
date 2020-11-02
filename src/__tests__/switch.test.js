const { testEva } = require('./test-runner');

function TestSwitch() {
  console.log('Switch Tests');
  console.log('--------------------------------------------------------------------------------');

  const tests = [
    {
      name: 'Lambda 1',
      input: `
        (begin
          (var x 10)
          (switch ((= x 10) 100)
                  ((> x 10) 200)
                  (else     300)
          )
        )
      `,
      expected: 100,
    },
  ];

  testEva(tests);
}

module.exports = TestSwitch;
