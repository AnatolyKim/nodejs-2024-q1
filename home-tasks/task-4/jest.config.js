module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./src'],
  coverageThreshold: {
    global: {
      lines: 85
    }
  }
};