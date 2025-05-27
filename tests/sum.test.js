const sum = require('../src/sum');

it ('should return the sum of two numbers', () => {
    const result = sum(2, 5);
    expect(result).toBe(7);
    });