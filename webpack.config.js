const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const development = true;

module.exports = {
    mode: (development) ? 'development' : 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'messenger.bundle.[fullhash].js'
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
            test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
            type: 'static/static',
        }, {
            test: /\.css$/,
            use: [
                "style-loader",
                "css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                [
                                    "postcss-preset-env",
                                    {
                                        // Options
                                    },
                                ],
                            ],
                        },
                    },
                },
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
            title: 'Messenger',
            template: './index.html',
            minify: {
                collapseWhitespace: !development,
            },
        })
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: !development,
        port: 3000,
        historyApiFallback: true,
        hot: true,
    }
};
