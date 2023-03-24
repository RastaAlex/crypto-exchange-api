'use strict';

module.exports = {
  rootDir: './',
  automock: false,
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  verbose: true,
  silent: false,
  maxWorkers: '50%',
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '__snapshots__'],
  testMatch: ['**/test/**/*.test.[jt]s'],
  moduleNameMapper: {
    '^@accounts/(.*)$': '<rootDir>/src/accounts/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@crypto/(.*)$': '<rootDir>/src/crypto/$1',
    '^@database/(.*)$': '<rootDir>/src/database/$1',
  },
};
