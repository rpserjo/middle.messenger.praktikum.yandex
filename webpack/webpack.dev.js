const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: path.join(__dirname, '../static'),
        compress: true,
        port: 4000,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Ya-Messenger',
            template: './index.html',
            minify: {
                collapseWhitespace: true,
            },
        }),
    ]
});
