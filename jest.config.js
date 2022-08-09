/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {

coverageDirectory:'coverage',
collectCoverageFrom:['src/**/*.{js,ts}'],
coverageThreshold:{
  global:{
    branches:0,
    functions:0,
    lines:0,
    statements:0,
  },
},
preset: 'ts-jest',
moduleNameMapper:{
  '^@src/(.*)$': '<rootDir>/src/$1',
  '^@class/(.*)$': '<rootDir>/src/class/$1',
  '^@config/(.*)$': '<rootDir>/src/config/$1',
  '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
  '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
  '^@lib/(.*)$': '<rootDir>/src/lib/$1',
  '^@routes/(.*)$': '<rootDir>/src/routes/$1',
  '^@schemas/(.*)$': '<rootDir>/src/schemas/$1',
  '^@test/(.*)$': '<rootDir>/src/test/$1',
  '^@models/(.*)$': '<rootDir>/src/test/$1',
},
moduleDirectories:["node_modules","src"],
  testEnvironment: 'node',
};