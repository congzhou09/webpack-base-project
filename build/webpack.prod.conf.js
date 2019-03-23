const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: false,
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: path.resolve(__dirname, '../dist/static'),
                ignore: ['.*']
            }
        ])
    ]
});

module.exports = webpackConfig;