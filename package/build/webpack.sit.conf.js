const prodWebpackConfig = require('./webpack.prod.conf');

const webpackConfig = { ...prodWebpackConfig, mode: 'development', devtool: 'eval-source-map' };

module.exports = webpackConfig;
