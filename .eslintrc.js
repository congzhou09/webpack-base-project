module.exports = {
  root: true,
  extends: ['google', 'plugin:react/recommended', 'plugin:prettier/recommended'],
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
    'require-jsdoc': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
