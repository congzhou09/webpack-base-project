const requireUncached = require('./util').requireUncached;
const baseWebpackConfig = requireUncached('./webpack.base.conf');
const { merge } = require('webpack-merge');
const baseConfig = requireUncached('./config');

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 2018,
    hot: true,
    client: {
      progress: true,
    },
    historyApiFallback: {
      rewrites: [{ from: /^\/$/, to: baseConfig.urlPrefix + '/index.html' }],
    },
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
});

if (process.env.ENV !== 'development') {
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash].css',
    }),
  );
}

module.exports = webpackConfig;
