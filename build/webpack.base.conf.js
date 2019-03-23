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
        path: resolve("dist"),
        filename: "[name]-[hash].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [resolve('src')],
                use: 'babel-loader'
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