//webpack2配置文件
var webpack = require('webpack');
var path = require('path');
//需要npm install
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
//var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports ={
	entry: {
		newauto : './src/main.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	devServer: {//
	  contentBase: path.join(__dirname),//基本路径
	  compress: true,
	  port: 9000//端口
	},
    resolve:{
		extensions: [".js", ".json"]
    },
	module: {
		//loaders --> rules
		rules: [
		   {
				test: /\.css$/,
				use:  ['style-loader', 'css-loader']
		   },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader?limit=11000&name=[path][name].[ext]&publicPath=../'//-[hash:5]
                    }
                ]
            },
           {
           	test: /\.html$/,
           	use: [
           		{
           			loader: 'file-loader'
           			
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
            JSTest: JSON.stringify(true)
        }),
        //分离css文件插件
        new ExtractTextPlugin('css/[name]_[hash:5].css'),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist/pages', 'home.html'),
            template: path.resolve(__dirname, 'pages', 'imageTpl.html'),
            minify: false,
            chunks: ['newauto']
        })
	]
	
}