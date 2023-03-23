const requireUncached = require('./util').requireUncached;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = requireUncached('./config');

const workDirectory = process.cwd();
function resolve(dir) {
  return path.join(workDirectory, dir);
}

const webpackConfig = {
  context: resolve('.'),
  entry: {
    app: resolve('./src/index.js'),
  },
  output: {
    publicPath: baseConfig.urlPrefix,
    path: resolve('dist'),
    filename: 'js/[name]-[contenthash].js',
  },
  cache: {
    type: 'filesystem',
  },
  optimization: {
    runtimeChunk: 'single', // 将webpack的runtime单独提取到一个chunk，且被多个入口共用
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 单独提取到vendor中的库
          test: /[\\/]node_modules[\\/](jquery)[\\/]/,
          name: 'vendor',
          chunks: 'all',
          priority: 2, // 某个module同时符合多个Group的条件的时候移入priority值更大的chunk中
        },
        common: {
          // 其他node_modules文件夹里的库提取到common中
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.ts', '.tsx'],
    alias: {
      '@utils': resolve('src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [resolve('src')],
        use: ['thread-loader', 'babel-loader'],
      },
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          process.env.ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions',
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          process.env.ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions',
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                modifyVars: {
                  'primary-color': '#1DA57A',
                  'link-color': '#1DA57A',
                  'border-radius-base': '2px',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          process.env.ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions',
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'image',
              name: '[name]-[contenthash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'font',
              name: '[name]-[contenthash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template.html',
      inject: 'body',
    }),
    // webpack-dev-server在内存中虚拟一套目录，也需要用到CopyWebpackPlugin，否则当publicPath非默认值时会导致某些static下的资源在dev模式下访问不到
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('static'),
          to: resolve('/dist/static'),
        },
      ],
    }),
    new ProgressBarPlugin(),
  ],
};

module.exports = webpackConfig;
