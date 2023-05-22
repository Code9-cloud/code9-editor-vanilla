const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const { SourceMapDevToolPlugin } = require("webpack");

//    "build": "flow-remove-types src/ -d dist/",
//    "watch": "npm-watch build",
module.exports = {
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.m?js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new SourceMapDevToolPlugin({
            filename: "[file].map"
        }),
        new HtmlWebpackPlugin({
            title: 'Code9 Editor',
            template: 'src/index.html' })
    ],
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 4000,
    },
};