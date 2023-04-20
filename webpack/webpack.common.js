const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, '../dist/'),
        publicPath: '/',
        filename: '[name].bundle.[fullhash].js',
        clean: true
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [{
                loader: 'ts-loader',
                options: {
                    configFile: path.resolve(__dirname, '../tsconfig.json'),
                },
            }],
            exclude: /(node_modules)/
        }, {
            test: /\.css$/,
            use: [
                "style-loader",
                "css-loader",
                "postcss-loader"
            ],
        }, {
            test: /\.hbs$/,
            use: [{
                loader: 'handlebars-loader'
            }]
        }]
    },
}
