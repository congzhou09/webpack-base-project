import type { Config } from '@jest/types';
import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config.InitialOptions = {
  verbose: true,
  bail: 1,
  testEnvironment: 'jsdom',
  rootDir: './',
  roots: ['src'],
  // testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: `<rootDir>./` }),
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest-mock/file-mock.js',
    '^.+\\.(s?css|less)$': '<rootDir>/jest-mock/style-mock.js',
  },
};

export default config;
