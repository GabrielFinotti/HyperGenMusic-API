export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  // Exemplo de paths customizados (opcional)
  // moduleNameMapper: {
  //   "^@domain/(.*)$": "<rootDir>/src/domain/$1",
  //   "^@application/(.*)$": "<rootDir>/src/application/$1",
  // },
};
