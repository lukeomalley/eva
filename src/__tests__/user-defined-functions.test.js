const { testEva } = require('./test-runner');

function TestUserDefinedFunctions() {
  console.log('User Defined Function Tests');
  console.log('--------------------------------------------------------------------------------');

  const tests = [
    {
      name: 'Functons 1',
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

    {
      name: 'Functons 2',
      input: `
        (begin
          (var z 100)

          (def calc (x y)
            (begin
              (var z 1000)
              (+ z (+ x y))
            )
          )

          (calc z 10)
        )
      `,
      expected: 1110,
    },

    {
      name: 'Functons 3',
      input: `
        (begin
          (var value 100)

          (def calc (x y)
            (begin
              (var z (+ x y))

              (def inner (foo)
                (+ (+ foo z) value)
              )

              inner
            )
          )

          (var fn (calc 10 20))

          (fn 30)
        )
      `,
      expected: 160,
    },
  ];

  testEva(tests);
}

module.exports = TestUserDefinedFunctions;
