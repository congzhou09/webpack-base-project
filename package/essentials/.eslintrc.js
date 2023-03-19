module.exports = {
  root: true,
  extends: ['google', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'require-jsdoc': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'react-hooks/exhaustive-deps': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'no-unused-vars': 'off',
    'prefer-destructuring': ['error', { object: true, array: true }],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
