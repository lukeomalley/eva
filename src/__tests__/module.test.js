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
    {
      name: 'Module 2 - Import',
      input: `
        (import Math)

        (prop Math PI)
      `,
      expected: 3,
    },
    {
      name: 'Module 3 - Import',
      input: `

        (var square (prop Math square))

        (square (- 10))
      `,
      expected: 100,
    },
  ];

  testEva(tests);
}

module.exports = TestModules;
