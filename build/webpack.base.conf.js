const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir);//__dirname是当前文件所在目录
}

module.exports = {
    context: resolve('.'),
    entry:{
        app: './src/main.js'
    },
    output: {
        path: resolve("dist/js"),
        filename: "[name]-[hash].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [resolve('src')],
                use: 'babel-loader'
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
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        })
    ]
};