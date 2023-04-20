const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')

const development = true;

module.exports = {
    mode: (development) ? 'development' : 'production',
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist/'),
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
                    configFile: path.resolve(__dirname, 'tsconfig.json'),
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
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Ya-Messenger',
            template: './index.html',
            minify: {
                collapseWhitespace: !development,
            },
        }),
        new CopyPlugin({
            patterns: [{from: 'static/static', to: 'static'}]
        })
    ],
    devServer: {
        static: path.join(__dirname, 'static'),
        compress: true,
        port: 4000,
        historyApiFallback: true
    }
};
