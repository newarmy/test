const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack 4, s
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//压缩js
const TerserJSPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.commen.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [

            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                },
                    {
                        loader: 'css-loader',
                    }]
            },
            /*{
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            publicPath: '../'
                        }
                    }
                ]
            },*/
           /* {
                test: /\.(png|jpg|gif)$/i,
                use: 'url-loader?limit=3000&name=[path][name].[ext]&publicPath=../'
            }*/

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist/page', 'index.html'),
            template: path.resolve(__dirname, 'page/index.html'),
            minify: false,
            chunks: ['main', 'venders']
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
		new ImageminPlugin({
			    test: '*.png',
                pngquant: {
                    quality: '65-80'
                }
			  /*plugins: [
				imageminPngquant({ quality: '65-80' })
			  ]*/
		}),
		/*new ImageminPlugin({
			  test: '*.jpg',
			  plugins: [
				imageminMozjpeg({
				  quality: 80,
				  progressive: true
				})
			  ]
		}),*/
		

        

    ],
    /**
     * https://segmentfault.com/a/1190000013476837
     * https://juejin.im/post/5af1677c6fb9a07ab508dabb
     * */
    optimization: {
        //提取公共代码
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                }
            }
        },
        // 压缩 js css
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    }
});
