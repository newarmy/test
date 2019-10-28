const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin'); // 压缩 js
const OptimizeCSSAssetsPlugin  = require('optimize-css-assets-webpack-plugin');// 压缩 css
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const config = require('./config');
module.exports = {
    context: path.resolve(__dirname),
    mode: 'production',
    entry: {
      main: config.enterUrl,
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, config.static.output),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        transformAssetUrls :{
                            video: ['src', 'poster'],
                            source: 'src',
                            img: ['src', ':data-src'],
                            image: ['xlink:href', 'href'],
                            use: ['xlink:href', 'href']
                        },
                        prettify: true
                    }
                }],
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src')],
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
                    MiniCssExtractPlugin.loader, // webapck4中分离css
                    'css-loader',
                    'postcss-loader'
                ],
                include: [path.resolve(__dirname, 'assets'), path.resolve(__dirname, 'src')]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader:'html-loader'
                     },
                    // {
                    //     loader: 'prettier-loader',
                    //     options: {
                    //         skipRewritingSource: true,
                    //     }
                    // },
                ],
                include: [path.resolve(__dirname, 'assets')]
            }
        ]
    },
    plugins: [
        /**
         * All files inside webpack's output.path directory will be removed once, but the
         * directory itself will not be. If using webpack 4+'s default configuration,
         *
         * **/
        new CleanWebpackPlugin(),
        // 请确保引入这个插件来施展魔法
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     /**
        //      * 在这里引入 manifest 文件
        //      */
        //     manifest: require('./dist/js/vendors-manifest.json')
        // }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, config.static.output, 'index.html'),
            template: path.resolve(__dirname, 'assets', 'imageTpl.html'),
            //minify: false,
            chunks: ['main', 'vendors']
        }),
        //https://github.com/chrisvfritz/prerender-spa-plugin
        //https://www.cnblogs.com/kdcg/p/9606302.html
        //https://blog.csdn.net/qq_36320160/article/details/101469184
        new PrerenderSPAPlugin({
            staticDir: path.join(__dirname, config.static.output),
            outputDir: path.join(__dirname, config.static.output),
            routes: [ '/' ],
            indexPath: path.join(__dirname, config.static.output, 'index.html'),
            /*server: {
                port: 8001,
                proxy: {
                    '/': {
                        target: 'http://localhost:8001/page/',
                        secure: false
                    }
                }
            },*/
           /* minify: {
                collapseBooleanAttributes: false,
                collapseWhitespace: false,
                collapseInlineTagWhitespace: false,
                decodeEntities: true,
                keepClosingSlash: true,
                sortAttributes: true
            },*/
            renderer: new Renderer({
                inject: {
                    foo: 'bar'
                },

                headless: false,
                renderAfterDocumentEvent: 'render-event'
            })
        }),


        //包分析
       // new BundleAnalyzerPlugin({openAnalyzer: false, reportFilename: './index.html'})
    ],
    optimization: {
        // webpack 4,提取公共模块
        //https://webpack.docschina.org/plugins/split-chunks-plugin/
        splitChunks: {
            // 这表示将选择哪些块进行优化。提供字符串时，有效值为all、async和initial。提供all功能特别强大，
            // 因为这意味着块甚至可以在异步块和非异步块之间共享。
            chunks: 'all',
            //缓存组可以继承和/或重写splitchunks.*中的任何选项；
            // 但只能在缓存组级别配置test、priority和reuseexistingchunk。
            // 要禁用任何默认缓存组，请将其设置为false
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    //控制此缓存组选择的模块。忽略它将选择所有模块。它可以匹配绝对模块资源路径或块名称。
                    // 匹配块名称时，将选择块中的所有模块。
                    test: /[\\/]node_modules[\\/]/,
                }
            }
        },
        // 压缩 js css
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
    }
}