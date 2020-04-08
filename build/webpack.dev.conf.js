const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const getPath = function (subpath) {
    return path.posix.resolve(__dirname, '..', subpath)
}
module.exports = merge(baseConfig, {
    entry: {
        app: getPath('src/docs/main.js')
    },
    output: {
        path: getPath('dist-docs'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        host: 'localhost',
        port: 1127,
        publicPath: '/',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join('/index.html') },
            ]
        },
        clientLogLevel: 'warning',  // 开启这个，否则console会打印出很多 HMR 和 WDS 的日志。WDS 就是 webpack-dev-server的简称吗？
        hot: true,
        quiet: true,
        proxy: {
            '/sss': {
                target: 'http://192.168.2.10:8080/',
                changeOrigin: true,
                pathRewrite: {
                    '^/sss': ''
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.NamedChunksPlugin(),
        new webpack.HotModuleReplacementPlugin(),  // 只有有了这个plugin，上面的 hot设置才有效？
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: getPath('src/docs/index.html')
        }),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://localhost:1127`],
            },
            onErrors: undefined
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                let res = module.resource;
                return /node_modules/.test(res) && /\.js$/.test(res)
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity,
        })
    ]
})