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
    devServer: {
        hot: true,
        host: 'localhost',
        port: 1127,
        publicPath: '/',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join('/index.html') },
            ]
        },
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
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: getPath('src/docs/index.html')
        }),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://localhost:1127`],
            },
            onErrors: undefined
        })
    ]
})