const { testEva } = require('./test-runner');

function TestModules() {
  console.log('Module Tests');
  console.log('--------------------------------------------------------------------------------');

  const tests = [
    {
      name: 'Module 1',
      input: `
        (module Math
          (begin
            (var PI 3)

            (def abs (value)
              (if (< value 0)
                (- value)
                (value)
              )
            )

            (def square (num)
              (* num num)
            )
            
          )  
        )

        ((prop Math abs) (- 10))
      `,
      expected: 10,
    },
  ];

  testEva(tests);
}

module.exports = TestModules;
