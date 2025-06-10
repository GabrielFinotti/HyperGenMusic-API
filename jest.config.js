module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/tests/unit/**/*.test.ts",
    "<rootDir>/src/tests/integration/**/*.test.ts",
  ],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  roots: ["<rootDir>/src/tests/unit", "<rootDir>/src/tests/integration"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
