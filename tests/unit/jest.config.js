// Configuring Jest
// See: https://facebook.github.io/jest/docs/en/configuration.html
module.exports = {
  verbose: true,
  // without this line rootDir will be `./tests`
  rootDir: '../..',
  // without this line sometimes `jsdom` fails to run the tests:
  // see: https://github.com/facebook/jest/issues/6766
  testURL: 'http://localhost',
  collectCoverage: true,
  // collectCoverageFrom: ['**/components/**/*.{vue}'],
  coverageDirectory: '<rootDir>/tests/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/', '/tests/',
  ],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: [
    'js', 'vue', 'json',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
};
