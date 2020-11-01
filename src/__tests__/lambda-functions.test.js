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
  ];

  testEva(tests);
}

module.exports = TestLambdaFunctions;
