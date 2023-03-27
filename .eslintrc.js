module.exports = {
  root: true,
  extends: ['google', 'plugin:vue/vue3-essential', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
  },
  rules: {
    'require-jsdoc': 'off',
    'comma-dangle': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
