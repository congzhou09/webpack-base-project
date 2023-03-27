module.exports = {
  presets: ['@babel/preset-env'],
  plugins: ['@vue/babel-plugin-jsx', ['@babel/plugin-transform-runtime', { corejs: 3 }], '@babel/plugin-proposal-private-methods'],
};
