const requireUncached = require('./util').requireUncached;
const prodWebpackConfig = requireUncached('./webpack.prod.conf');

const webpackConfig = { ...prodWebpackConfig, mode: 'development', devtool: 'eval-source-map' };

module.exports = webpackConfig;
