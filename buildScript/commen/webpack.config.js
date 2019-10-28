const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.commen.js');

module.exports = merge(common, {
    mode: 'none',
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dev'),
    },
    module: {
        rules: [

            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    // 1. 安装webpack-dev-server
    // 2. 在webpack.config.js写devServer配置
    // 3. 加 new webpack.HotModuleReplacementPlugin(),
    // 4. 通过 webpack-dev-server 命令启动(配置信息在webpack.config.js)
    devServer: {
        contentBase: path.resolve(__dirname, 'dev'),
        hot: true, //打开热更新
        host: 'localhost',//
        port: 3000,
        open: true, //打开默认浏览器
        openPage: 'page/index.html', //打开默认浏览器，显示的默认页面
        /**
         * 默认情况下，应用程序将启用内联模式。
         * 这意味着将在包中插入脚本以处理实时重新加载，
         * 并且生成消息将显示在浏览器控制台中
         * */
        inline: true,
        publicPath: '/',
    },
    plugins: [
        // 清除dist
        /**
         * All files inside webpack's output.path directory will be removed once, but the
         * directory itself will not be. If using webpack 4+'s default configuration,
         *
         * **/
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dev/page', 'index.html'),
            template: path.resolve(__dirname, 'page/index.html'),
            minify: false,
            chunks: ['main', 'vendors']
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.HotModuleReplacementPlugin(),
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