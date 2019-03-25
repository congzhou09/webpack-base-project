const baseWebpackConfig = require('./webpack.base.conf');
const merge = require('webpack-merge');

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: "eval-source-map",
    devServer: {
        port: 2018,
        index: 'index.html',
        historyApiFallback: true//router的history模式时使用
    }
});

module.exports = webpackConfig;