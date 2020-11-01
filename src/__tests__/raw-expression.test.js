const { testEvaWithoutParser } = require('./test-runner');

function test() {
  console.log('Raw Expression Tests');
  console.log('--------------------------------------------------------------------------------');
  const tests = [
    // Numbers
    { name: 'numbers 1', input: 1, expected: 1 },
    { name: 'numbers 2', input: 5, expected: 5 },
    { name: 'numbers 3', input: 1000, expected: 1000 },

    // Strings
    { name: 'strings 1', input: '"hello"', expected: 'hello' },
    { name: 'strings 2', input: '"world"', expected: 'world' },

    // Binary Operations
    { name: 'binary 1', input: ['+', 1, 5], expected: 6 },
    { name: 'binary 2', input: ['%', 2, 2], expected: 0 },
    { name: 'binary 3', input: ['+', ['*', 3, 2], 5], expected: 11 },
    { name: 'binary 4', input: ['/', ['*', 3, 2], 3], expected: 2 },
    { name: 'binary 5', input: ['-', ['-', ['*', 5, 5], 2], 3], expected: 20 },

    // Variables
    { name: 'variables 1', input: ['var', 'x', 5], expected: 5 },
    { name: 'variables 2', input: ['begin', ['var', 'x', 5], 'x'], expected: 5 },
    { name: 'variables 3', input: ['begin', ['var', 'isUser', 'true'], 'isUser'], expected: true },

    // Globals
    { name: 'globals 1', input: 'null', expected: null },
    { name: 'globals 2', input: 'true', expected: true },
    { name: 'globals 3', input: 'false', expected: false },

    // Print
    { name: 'print 1', input: ['print', '"print - Hello World!"'], expected: null },

    // Blocks
    {
      name: 'blocks 1',
      input: ['begin', ['var', 'x', 10], ['var', 'y', 20], ['+', ['*', 'x', 'y'], 30]],
      expected: 230,
    },
    {
      name: 'blocks 2',
      input: ['begin', ['var', 'x', 10], ['begin', ['var', 'x', 20]], 'x'],
      expected: 10,
    },
    {
      name: 'blocks 3',
      input: [
        'begin',
        ['var', 'value', 10],
        ['var', 'result', ['begin', ['var', 'x', ['+', 'value', 20]], 'x']],
        'result',
      ],
      expected: 30,
    },

    // Assignment
    {
      name: 'assignment 1',
      input: ['begin', ['var', 'data', 10], ['begin', ['set', 'data', ['*', 'data', 'data']]], 'data'],
      expected: 100,
    },

    // If
    {
      name: 'if 1',
      input: [
        'begin',
        ['var', 'x', 5],
        ['var', 'y', 20],
        ['if', ['>', 'x', 10], ['set', 'y', 20], ['set', 'y', 30]],
        'y',
      ],
      expected: 30,
    },

    // While
    {
      name: 'while 1',
      input: [
        'begin',
        ['var', 'counter', 1],
        ['var', 'result', 1],
        [
          'while',
          ['<', 'counter', 10],
          ['begin', ['set', 'result', ['*', 'result', 2]], ['set', 'counter', ['+', 'counter', 1]]],
        ],
        'result',
      ],
      expected: 512,
    },
  ];

  testEvaWithoutParser(tests);
}

module.exports = test;
