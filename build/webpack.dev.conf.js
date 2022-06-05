const baseWebpackConfig = require('./webpack.base.conf');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./config');

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 2018,
    // historyApiFallback: {
    //     index: baseConfig.urlPrefix
    // },
    static: {
      publicPath: baseConfig.urlPrefix,
    },
    // proxy: {
    //     '/onepath/*': {
    //         target: 'http://0.0.0.0:2018/',
    //         pathRewrite: {'^/onepath': ''},
    //     },
    //     '/pathtwo/*': {
    //         target: 'http://0.0.0.0:2018/',
    //         changeOrigin: true,
    //         secure: false
    //     }
    // }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name]-[hash].css',
    }),
  ],
});

module.exports = webpackConfig;
