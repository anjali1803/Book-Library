// In __tests__/unit.test.js
describe('Utility: Published Year Parser', () => {
  const parseYear = (input) => {
    return input ? parseInt(input) : null;
  };

  test('should return null for empty string', () => {
    expect(parseYear("")).toBe(null);
  });

  test('should parse valid year string', () => {
    expect(parseYear("2024")).toBe(2024);
  });
});
