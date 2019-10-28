const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                        loader: 'babel-loader'
                    }


            },
            {
                test: /\.(ttf|eof)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            publicPath: '../'
                        }
                    }
                ]
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
            },

            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        //加载资源
                      attrs: [':data-src', 'img:src'],
                    }
                }]
            }
        ]
    },
    plugins: [
        // 请确保引入这个插件来施展魔法
        /**
         * 这个插件是必须的！ 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
         * 例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
         * */
       // new VueLoaderPlugin(),
        //new CleanWebpackPlugin('dist')


    ]
}