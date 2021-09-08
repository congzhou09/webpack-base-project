module.exports = {
  root: true,
  extends: ['google', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  plugins: ['react-hooks'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'require-jsdoc': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn' // Checks effect dependencies
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
