const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.commen.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const es3ifyPlugin = require('es3ify-webpack-plugin');
module.exports = merge(common, {
    module: {
        rules: [

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: [
                        'style-loader',
                        'postcss-loader'
                    ],
                    use: 'css-loader'
                })
            },
           /* {
                test: /\.(png|jpg|gif)$/,
                use: 'url-loader?limit=4000&name=[path][name].[ext]&publicPath=../'
            },*/
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist', 'home.html'),
            minify: false,
            chunks: ['main']
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin("css/[name].css"),
        new es3ifyPlugin(),
        new UglifyJsPlugin({
            uglifyOptions: {
                ie8:true, //default: false, Enable IE8 Support
                //properties (default: true) --
                // rewrite property access using the dot notation,
                // for example foo["bar"] → foo.bar
                compress: {
                    properties: false,
                    warnings: false
                },
                // output: {
                //     beautify: true,
                //     quote_keys: true
                // },
               // warnings: false
            }
        }),


    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                }
            }
        }
    }
});
