const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: path.resolve(__dirname, '../static/static'), to: path.resolve(__dirname, '../dist/static') }],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
        }),
        new HtmlWebpackPlugin({
            title: 'Ya-Messenger',
            template: './index.html',
            favicon: './static/static/favicon.ico',
            minify: {
                collapseWhitespace: true,
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
        ],
    },
});
