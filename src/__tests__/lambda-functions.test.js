const { testEva } = require('./test-runner');

function TestLambdaFunctions() {
  console.log('Lambda Function Tests');
  console.log('--------------------------------------------------------------------------------');

  const tests = [
    {
      name: 'Lambda 1',
      input: `
        (begin
          (def onClick (callback)
            (begin
              (var x 10)  
              (var y 20)  
              (callback (+ x y))
            )
          ) 

          (onClick (lambda (data) (* data 10)))
        )
      `,
      expected: 300,
    },
    {
      name: 'Lambda 2',
      input: `
        ((lambda (x) (* x x)) 2)
      `,
      expected: 4,
    },
    {
      name: 'Lambda 3',
      input: `
        (begin
          (var square (lambda (x) (* x x)))
          (square 2)
        )
      `,
      expected: 4,
    },
  ];

  testEva(tests);
}

module.exports = TestLambdaFunctions;
