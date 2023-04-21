const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CopyPlugin({
            patterns: [{from: path.resolve(__dirname, '../static/static'), to: path.resolve(__dirname, '../dist/static')}],
        }),
        new HtmlWebpackPlugin({
            title: 'Ya-Messenger',
            template: './index.html',
            minify: {
                collapseWhitespace: true,
            },
        }),
    ],
});
