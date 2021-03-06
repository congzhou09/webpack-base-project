module.exports = {
  root: true,
  extends: ['google', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    "require-jsdoc": "off"
  }
};
