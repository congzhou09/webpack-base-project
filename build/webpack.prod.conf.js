const baseWebpackConfig = require('./webpack.base.conf');
const { merge } = require('webpack-merge');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const analysisBundle = false;

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: false,
  output: {
    filename: 'static/js/[name]-[contenthash].js',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // set to true if you want JS source maps
        uglifyOptions: {
          compress: {
            inline: false,
          },
        }, // for uglifyjs-webpack-plugin inline parameter reuses bug
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CompressionWebpackPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      minRatio: 0.8,
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name]-[contenthash].css',
    }),
  ],
});

// 是否进行chunk分析
if (analysisBundle) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
