const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const getPath = function (subpath) {
    return path.posix.resolve(__dirname, '..', subpath)
}
module.exports = merge(baseConfig, {
    entry: {
        app: getPath('src/docs/main.js')
    },
    output: {
        path: getPath('dist-docs'),
        filename: '[name].js',
        chunkFilename: 'js/[id].js',
    },
    devServer: {
        hot: true,
        host: 'localhost',
        port: 1127,
        publicPath: '/',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join('/demo.html') },
            ]
        },
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
        new webpack.HotModuleReplacementPlugin(),  // 模块热替换的关键
        new HtmlWebpackPlugin({
            filename: 'demo.html',
            template: getPath('src/docs/index.html')
        }),
    ]

})