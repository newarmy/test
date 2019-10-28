const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('./config');
module.exports = {
    mode: 'development',
    entry: {
      main: config.enterUrl,
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, config.dev.output),
    },
    // https://webpack.js.org/configuration/dev-server/#devserverinline
    // 1. 安装webpack-dev-server
    // 2. 在webpack.config.js写devServer配置
    // 3. 加 new webpack.HotModuleReplacementPlugin(),
    // 4. 通过 webpack-dev-server 命令启动(配置信息在webpack.config.js)
    devServer: {
        contentBase: path.resolve(__dirname,  config.dev.output),
        hot: true, //打开热更新
        host: 'localhost',//
        port: 3000,
        open: true, //打开默认浏览器
        openPage: 'index.html', //打开默认浏览器，显示的默认页面
        /**
         * 默认情况下，应用程序将启用内联模式。
         * 这意味着将在包中插入脚本以处理实时重新加载，
         * 并且生成消息将显示在浏览器控制台中
         * */
        inline: true,
        publicPath: '/',
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
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            fallback: 'file-loader?name=[path][name].[ext]&publicPath=../',
                            limit:3000
                        }
                    }
                ],
                include: [path.resolve(__dirname, 'assets/img'),  path.resolve(__dirname, 'src')]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader?name=[path][name].[ext]&publicPath=./',
                    }
                ],
                include: [path.resolve(__dirname, 'assets/images'),  path.resolve(__dirname, 'src')]
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
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // 请确保引入这个插件来施展魔法
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname,  config.dev.output, 'index.html'),
            template: path.resolve(__dirname, 'assets', 'imageTpl.html'),
            //minify: false,
            chunks: ['main', 'vendors']
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