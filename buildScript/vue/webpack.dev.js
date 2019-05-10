const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: {
      main: './src/enter/main.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/transform-runtime']
                    }
                }

            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'url-loader?limit=4000&name=[path][name].[ext]'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader?publicPath=./'
            }
        ]
    },
    plugins: [
        // 请确保引入这个插件来施展魔法
        /**
         * 这个插件是必须的！ 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
         * 例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
         * */
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist', 'home.html'),
            template: path.resolve(__dirname, 'public', 'imageTpl.html'),
            minify: false,
            chunks: ['main', 'vendors']
        }),
        new webpack.optimize.SplitChunksPlugin({
            chunks: 'all',
            name: 'vender',
            test: /[\\/]node_modules[\\/]/,
        })
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
}