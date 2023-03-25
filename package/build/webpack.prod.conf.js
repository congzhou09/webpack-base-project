const requireUncached = require('./util').requireUncached;
const baseWebpackConfig = requireUncached('./webpack.base.conf');
const { merge } = require('webpack-merge');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const baseConfig = requireUncached('./config');

let webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: false,
  output: {
    filename: 'js/[name]-[contenthash].js',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
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
      filename: 'css/[name]-[contenthash].css',
    }),
  ],
});

// 是否进行chunk分析
if (baseConfig.analysisBundle) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

// 是否进行speed分析
if (baseConfig.speedMeasure) {
  const SpeedMeasure = require('speed-measure-webpack-plugin');
  const speedMeasure = new SpeedMeasure();

  const miniCssPluginIndex = webpackConfig.plugins.findIndex((one) => one.constructor.name === 'MiniCssExtractPlugin');
  const miniCssPlugin = webpackConfig.plugins[miniCssPluginIndex];

  webpackConfig = speedMeasure.wrap(webpackConfig);
  webpackConfig.plugins[miniCssPluginIndex] = miniCssPlugin;
}

module.exports = webpackConfig;
