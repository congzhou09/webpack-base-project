const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir);//__dirname是当前文件所在目录
}

module.exports = {
    context: resolve('.'),
    entry:{
        app: './src/main.js'
    },
    output: {
        path: resolve("dist"),
        filename: "js/[name]-[hash].js"
    },
    optimization:{
        runtimeChunk: "single", //将webpack的runtime单独提取到一个chunk，且被多个入口共用
        splitChunks:{
            cacheGroups: {
                vendor: { //单独提取到vendor中的库
                    test: /[\\/]node_modules[\\/](vue|vue-router)[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    priority: 2 //某个module同时符合多个Group的条件的时候移入priority值更大的chunk中
                },
                common: {  //其他node_modules文件夹里的库提取到common中
                    test: /[\\/]node_modules[\\/]/,
                    name: 'common',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            scss:[
                                'vue-style-loader',
                                'css-loader',
                                'sass-loader'
                            ]
                        }
                    }
                }]
            },
            {
                test: /\.js$/,
                include: [resolve('src')],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        "plugins": [
                            "dynamic-import-webpack"
                        ]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use:[{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'static/img/[name].[hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'static/fonts/[name].[hash:7].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        })
    ]
};