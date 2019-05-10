const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js'
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
                use:{
                        loader: 'babel-loader'
                    }


            },

            {
                test: /\.(png|jpg|gif)$/,
                use: 'url-loader?limit=4000&name=[path][name].[ext]'
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
       // new VueLoaderPlugin(),
        //new CleanWebpackPlugin('dist')


    ]
}