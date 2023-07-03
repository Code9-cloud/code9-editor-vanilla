const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const { SourceMapDevToolPlugin } = require("webpack");

//    "build": "flow-remove-types src/ -d dist/",
//    "watch": "npm-watch build",
module.exports = {
    mode: 'development',
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
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    'url-loader',
                    {
                        loader: 'image-webpack-loader',
                        // options: {
                        //     mozjpeg: {
                        //         progressive: true,
                        //         quality: 65
                        //     },
                        //     // optipng.enabled: false will disable optipng
                        //     optipng: {
                        //         enabled: false,
                        //     },
                        //     pngquant: {
                        //         quality: '65-90',
                        //         speed: 4
                        //     },
                        //     gifsicle: {
                        //         interlaced: false,
                        //     }
                        // }
                    }
                ]
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