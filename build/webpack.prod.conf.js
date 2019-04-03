const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const merge = require('webpack-merge');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const analysisBundle = true;

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: false,
    plugins: [
        new CleanWebpackPlugin(),
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css)$'),
            minRatio: 0.8
        })
    ]
});

//是否进行chunk分析
if(analysisBundle)
{
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}


module.exports = webpackConfig;