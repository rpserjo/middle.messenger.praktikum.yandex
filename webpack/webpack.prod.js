const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
console.log(path.resolve(__dirname, 'static/static'))
module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Ya-Messenger',
            template: './index.html',
            minify: {
                collapseWhitespace: true,
            },
        }),
        new CopyPlugin({
            patterns: [{from: path.resolve(__dirname, '../static/static'), to: path.resolve(__dirname, '../dist/static')}]
        })
    ],
});
