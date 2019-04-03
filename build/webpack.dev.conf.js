const baseWebpackConfig = require('./webpack.base.conf');
const merge = require('webpack-merge');
const baseConfig = require('./config');

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: "eval-source-map",
    devServer: {
        port: 2018,
        index: 'index.html',
        // historyApiFallback: {
        //     index: baseConfig.urlPrefix
        // },
        publicPath: baseConfig.urlPrefix,
        // proxy: {
        //     '/onepath/*': {
        //         target: 'http://0.0.0.0:2018/',
        //         pathRewrite: {'^/onepath': ''},
        //     }
        // }
    }
});

module.exports = webpackConfig;