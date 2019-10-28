//webpack2配置文件
var webpack = require('webpack');
var path = require('path');
//需要npm install
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports ={
	entry: {
		imageGroup : './src/enter.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].js'
	},
	devServer: {//
	  contentBase: path.join(__dirname),//基本路径
	  compress: true,
	  port: 9000//端口
	},
	module: {
		//loaders --> rules
		rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: 'css-loader',
                        options: {
                            minimize: true || {/* CSSNano Options */}
                        }
                    },
                    //publicPath: 'http://m1.auto.itc.cn/test/news/img/'
                    //publicPath:'../'
                })
                //分离css文件loader
            },


            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader?limit=3000&name=[path][name].[ext]&publicPath=../'//-[hash:5]
                    }
                ],
                include: [path.resolve(__dirname, 'img')]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader?name=[path][name].[ext]&publicPath=./',
                    }
                ],
                include: [path.resolve(__dirname, 'images')]
            },
           {
           	test: /\.html$/,
           	use: [
           		{
           			loader: 'html-loader'
           			
           		}
           	]
           },
            {
                test: /\.tpl/,
                use: [
                    {
                        loader: 'raw-loader'

                    }
                ]
            }
		]
	},
	plugins: [
        new webpack.DefinePlugin({
            JSTest: JSON.stringify(false)
        }),
	    //js压缩插件
		 new webpack.optimize.UglifyJsPlugin({
            compress: {
                properties: false,
                warnings: false
            },
            output: {
                beautify: false,
                quote_keys: true
            },
            mangle: {
                screw_ie8: false // 兼容ie8
            },
            sourceMap: false
        }),
		//分离css文件插件
		new ExtractTextPlugin('css/[name]_[hash:5].css'),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist', 'imageGroup.html'),
            template: path.resolve(__dirname,  'imageGroup.html'),
            minify: false,
            chunks: ['imageGroup']
        })
	]
	
}