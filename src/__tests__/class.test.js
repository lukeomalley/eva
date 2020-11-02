const { testEva } = require('./test-runner');

function TestClasses() {
  console.log('Class Tests');
  console.log('--------------------------------------------------------------------------------');

  const tests = [
    {
      name: 'Class 1',
      input: `
        (begin
          (class Point null
            (begin

              (def constructor (this x y)
                (begin
                  (set (prop this x) x)
                  (set (prop this y) y)
                )
              )

              (def calc (this)
                (begin
                  (+ (prop this x) (prop this y))
                )
              )

            )
          )

          (var p (new Point 10 20))
          ((prop p calc) p )
        )
      `,
      expected: 30,
    },
  ];

  testEva(tests);
}

module.exports = TestClasses;
