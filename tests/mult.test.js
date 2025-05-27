const mult = require('../src/mult');
it('should return the product of two numbers', () => {
    const result = mult(3, 4);
    expect(result).toBe(12);
});