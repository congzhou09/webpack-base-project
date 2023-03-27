const requireUncached = require('./util').requireUncached;
const prodWebpackConfig = requireUncached('./webpack.prod.conf');
const { merge } = require('webpack-merge');

const webpackConfig = merge(prodWebpackConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  cache: false, // if there is an existing development cache, may cause "Cannot read property 'buildMeta' of undefined"
});

module.exports = webpackConfig;
